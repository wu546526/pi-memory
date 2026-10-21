import type { MarkdownMemoryBackend } from "./backend.js";
import type { ParsedEntry, ResolvedMemory, StoreMemoryEntry } from "./types.js";
export type WritePathDeps = {
    backend: MarkdownMemoryBackend;
    memoryFile: string;
    agentDir: string;
    maxLines: number;
    createId: () => string;
    newAutoFilePath: () => string;
    readResolvedUnlocked: () => Promise<ResolvedMemory>;
};
export declare function normalizeEntry(entry: StoreMemoryEntry, createId: () => string): StoreMemoryEntry;
/** Ground Truth ingress gate: normalize → redact → skip if empty. */
export declare function prepareEntryForWrite(entry: StoreMemoryEntry, createId: () => string): StoreMemoryEntry | null;
export declare function tryAppendUnlocked(deps: WritePathDeps, entry: StoreMemoryEntry): Promise<boolean>;
/** Physical write only; entry must already pass prepareEntryForWrite. */
export declare function appendOneUnlocked(deps: WritePathDeps, entry: StoreMemoryEntry): Promise<void>;
export declare function appendIfAbsentUnlocked(deps: WritePathDeps, entry: StoreMemoryEntry): Promise<boolean>;
export declare function appendToOverflowUnlocked(deps: WritePathDeps, entry: StoreMemoryEntry, main: string): Promise<void>;
export declare function rewriteEntriesUnlocked(deps: WritePathDeps, entries: ParsedEntry[]): Promise<void>;
//# sourceMappingURL=writePath.d.ts.map