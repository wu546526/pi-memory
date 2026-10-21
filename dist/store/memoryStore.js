import { randomBytes } from "node:crypto";
import { CONSOLIDATE_GC_INTERVAL_DAYS, CONSOLIDATE_OVERFLOW_FILE_THRESHOLD, DEFAULT_FALLBACK_MAX_CHARS, DEFAULT_MAX_LINES, DEFAULT_MEMORY_FILE, AUTO_FILE_PREFIX, } from "../constants/memory.js";
import { readChunkingConfig } from "../config/chunking.js";
import { initializeMemoryWorkspace } from "./initWorkspace.js";
import { joinPath, readText, readTextRequired, writeText } from "../utils/fs.js";
import { daysSince, formatLocalDate, formatTimestamp } from "../utils/time.js";
import { ingestMemoryExport } from "./ingestEntries.js";
import { MarkdownMemoryBackend } from "./backend.js";
import { buildIndexDocuments } from "./indexChunks.js";
import { createStoreListeners } from "./listeners.js";
import { countLines } from "./markdown/format.js";
import { listOverflowPointers } from "./markdown/parse.js";
import { getAgentPaths, resolveAgentDir } from "./paths.js";
import { collectResolvedEntries } from "./resolveEntries.js";
import { appendIfAbsentUnlocked, rewriteEntriesUnlocked, tryAppendUnlocked, } from "./writePath.js";
export class MemoryStore {
    paths;
    backend;
    maxLines;
    fallbackMaxChars;
    listeners = createStoreListeners(() => this.consolidating);
    consolidating = false;
    constructor(opts) {
        const agentDir = resolveAgentDir(opts.agentDir);
        this.paths = getAgentPaths(agentDir, opts.memoryFileName ?? DEFAULT_MEMORY_FILE);
        this.backend = new MarkdownMemoryBackend(this.paths.memoryFile);
        this.maxLines = opts.maxLines ?? DEFAULT_MAX_LINES;
        this.fallbackMaxChars = opts.defaultFallbackMaxChars ?? DEFAULT_FALLBACK_MAX_CHARS;
    }
    collectResolvedOpts() {
        return {
            backend: this.backend,
            agentDir: this.paths.agentDir,
            memoryFile: this.paths.memoryFile,
        };
    }
    writePathDeps() {
        return {
            backend: this.backend,
            memoryFile: this.paths.memoryFile,
            agentDir: this.paths.agentDir,
            maxLines: this.maxLines,
            createId: () => this.newEntryId(),
            newAutoFilePath: () => this.newAutoFilePath(),
            readResolvedUnlocked: () => this.readResolvedUnlocked(),
        };
    }
    get agentDir() {
        return this.paths.agentDir;
    }
    async ensureInitialized() {
        await initializeMemoryWorkspace(this.paths.agentDir);
    }
    async isEmpty() {
        const entries = await this.listEntries();
        return entries.length === 0;
    }
    async getStats() {
        const raw = await this.readRaw();
        const entries = await this.listEntries();
        const overflowFileCount = (await this.backend.listAutoFiles(this.paths.agentDir)).length;
        const lastConsolidatedAt = await this.readGcTimestamp();
        return {
            lineCount: countLines(raw),
            overflowFileCount,
            entryCount: entries.length,
            lastConsolidatedAt,
        };
    }
    async readRaw() {
        return this.backend.readText(this.paths.memoryFile);
    }
    async listEntries() {
        const resolved = await this.readResolved();
        return resolved.entries;
    }
    async readResolved() {
        await this.ensureInitialized();
        return collectResolvedEntries(this.collectResolvedOpts());
    }
    async readForFallback(maxChars = this.fallbackMaxChars) {
        const resolved = await this.readResolved();
        if (resolved.entries.length === 0)
            return "";
        const blocks = resolved.entries.map((entry) => {
            const tag = entry.userAuthored ? "[user] " : "";
            return `- ${tag}${entry.content}`;
        });
        let text = blocks.join("\n");
        if (text.length <= maxChars)
            return text;
        return `${text.slice(0, maxChars)}\n…`;
    }
    async exportForIndex() {
        const resolved = await this.readResolved();
        return buildIndexDocuments(resolved.entries, readChunkingConfig());
    }
    async append(entry) {
        let written = false;
        await this.backend.withMemoryLock(async () => {
            written = await tryAppendUnlocked(this.writePathDeps(), entry);
        });
        if (written)
            this.listeners.notifyAfterWrite();
    }
    async appendUser(entry) {
        let written = false;
        await this.backend.withMemoryLock(async () => {
            written = await tryAppendUnlocked(this.writePathDeps(), { ...entry, userAuthored: true });
        });
        if (written)
            this.listeners.notifyAfterWrite();
    }
    async appendMany(entries, opts) {
        let written = 0;
        const deps = this.writePathDeps();
        await this.backend.withMemoryLock(async () => {
            for (const entry of entries) {
                if (opts?.mode === "ifAbsent") {
                    if (await appendIfAbsentUnlocked(deps, entry))
                        written += 1;
                }
                else if (await tryAppendUnlocked(deps, entry)) {
                    written += 1;
                }
            }
        });
        if (written > 0)
            this.listeners.notifyAfterWrite();
        return written;
    }
    async appendIfAbsent(entry) {
        let added = false;
        await this.backend.withMemoryLock(async () => {
            added = await appendIfAbsentUnlocked(this.writePathDeps(), entry);
        });
        if (added)
            this.listeners.notifyAfterWrite();
        return added;
    }
    appendFromCompaction(opts) {
        void this.ingestCompactionSummary(opts).catch(() => { });
    }
    async ingestCompactionSummary(opts) {
        if (await this.hasProcessedCompaction(opts.compactionId))
            return;
        await this.ensureInitialized();
        await ingestMemoryExport({
            store: this,
            summary: opts.summary,
            isSubagent: !!opts.subagent,
        });
        await this.markCompactionProcessed(opts.compactionId);
        await opts.onComplete?.();
    }
    async updateEntry(id, patch) {
        // Path B: correction detector should reuse prepareEntryForWrite when content is patched.
        await this.backend.withMemoryLock(async () => {
            const resolved = await this.readResolvedUnlocked();
            const target = resolved.entries.find((entry) => entry.id === id);
            if (!target)
                throw new Error(`Memory entry not found: ${id}`);
            const next = {
                ...target,
                ...patch,
                id: target.id,
                section: patch.section ?? target.section,
                content: patch.content ?? target.content,
                timestamp: patch.timestamp ?? target.timestamp,
                userAuthored: patch.userAuthored ?? target.userAuthored,
            };
            await rewriteEntriesUnlocked(this.writePathDeps(), resolved.entries.map((entry) => (entry.id === id ? { ...entry, ...next } : entry)));
        });
        this.listeners.notifyAfterWrite();
    }
    async removeEntry(id, opts) {
        await this.backend.withMemoryLock(async () => {
            const resolved = await this.readResolvedUnlocked();
            const target = resolved.entries.find((entry) => entry.id === id);
            if (!target)
                return;
            if (target.userAuthored && !opts?.force) {
                throw new Error(`Cannot remove user-authored entry without force: ${id}`);
            }
            await rewriteEntriesUnlocked(this.writePathDeps(), resolved.entries.filter((entry) => entry.id !== id));
        });
        this.listeners.notifyAfterWrite();
    }
    async rewrite(content) {
        await this.backend.withMemoryLock(async () => {
            await this.backend.writeText(this.paths.memoryFile, content);
        });
        this.listeners.notifyAfterWrite({ skipConsolidateCheck: true });
    }
    async shouldConsolidate(at, cronFired = false) {
        const stats = await this.getStats();
        if (stats.overflowFileCount >= CONSOLIDATE_OVERFLOW_FILE_THRESHOLD)
            return true;
        if (cronFired)
            return true;
        if (!stats.lastConsolidatedAt)
            return false;
        return daysSince(stats.lastConsolidatedAt, at) >= CONSOLIDATE_GC_INTERVAL_DAYS;
    }
    isConsolidating() {
        return this.consolidating;
    }
    async rewriteMemoryUnderLock(updateEntries) {
        if (this.consolidating)
            return;
        this.consolidating = true;
        try {
            await this.backend.withMemoryLock(async () => {
                const resolved = await this.readResolvedUnlocked();
                const entries = await updateEntries(resolved.entries);
                await rewriteEntriesUnlocked(this.writePathDeps(), entries);
                await writeText(this.paths.memoryGcFile, `${formatTimestamp()}\n`);
            });
            this.listeners.notifySyncToSidecar();
        }
        finally {
            this.consolidating = false;
        }
    }
    async hasProcessedCompaction(compactionId) {
        const state = await this.readCompactionState();
        return state.processed.includes(compactionId);
    }
    async markCompactionProcessed(compactionId) {
        const state = await this.readCompactionState();
        if (!state.processed.includes(compactionId)) {
            state.processed.push(compactionId);
        }
        await writeText(this.paths.compactionStateFile, JSON.stringify(state, null, 2));
    }
    async verifyIntegrity() {
        const issues = [];
        const main = await this.backend.readText(this.paths.memoryFile);
        const pointers = listOverflowPointers(main);
        for (const fileName of pointers) {
            const path = this.backend.autoFilePath(this.paths.agentDir, fileName);
            try {
                await readTextRequired(path);
            }
            catch {
                issues.push(`Missing overflow file referenced by MEMORY.md: ${fileName}`);
            }
        }
        return { ok: issues.length === 0, issues };
    }
    onSyncToSidecar(listener) {
        return this.listeners.onSyncToSidecar(listener);
    }
    onConsolidateCheck(listener) {
        return this.listeners.onConsolidateCheck(listener);
    }
    async readResolvedUnlocked() {
        return collectResolvedEntries(this.collectResolvedOpts());
    }
    newEntryId() {
        return randomBytes(6).toString("hex");
    }
    newAutoFilePath() {
        const date = formatLocalDate();
        const suffix = randomBytes(3).toString("hex");
        return joinPath(this.paths.agentDir, `${AUTO_FILE_PREFIX}${date}-${suffix}.md`);
    }
    async readGcTimestamp() {
        const raw = await readText(this.paths.memoryGcFile);
        return raw.trim() || null;
    }
    async readCompactionState() {
        const raw = await readText(this.paths.compactionStateFile);
        if (!raw.trim())
            return { processed: [] };
        try {
            return JSON.parse(raw);
        }
        catch {
            return { processed: [] };
        }
    }
}
export function createMemoryStore(opts) {
    return new MemoryStore(opts);
}
//# sourceMappingURL=memoryStore.js.map