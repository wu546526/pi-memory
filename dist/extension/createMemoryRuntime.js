import { createLlmClient } from "../adapters/llm/index.js";
import { readPiMemoryEnv, resolveMemoryAgentDir } from "../config/index.js";
import { runEpisodicPreflight } from "../preflight/episodic.js";
import { queryIntentCache } from "../preflight/intentCache.js";
import { injectPrivateMemoryContext } from "../preflight/strip.js";
import { enqueueShutdownMetadata } from "../shutdown/enqueue.js";
import { resolveSidecarPaths } from "../sidecar/paths.js";
import { stopSidecar } from "../sidecar/sidecarManager.js";
import { isSubagentSession, readParentSession } from "../utils/session/index.js";
import { formatTimestamp } from "../utils/time.js";
import { MemoryStore } from "../store/memoryStore.js";
import { syncMaintenanceScheduler } from "../scheduler/sync.js";
import { bootstrapConsolidate, bootstrapSidecar, loadSessionMemoryCap, mergePrivateMemoryBlocks, } from "./lifecycle.js";
import { findLastUserMessageIndex, getUserMessageText, setUserMessageText, } from "./messageUtils.js";
class MemoryRuntimeImpl {
    store;
    sidecarPaths;
    sessionId;
    isSubagent;
    llmClient = null;
    sessionMemoryCap = null;
    turnPreflight = null;
    isFirstTurn = true;
    reindexScheduler = null;
    consolidateScheduler = null;
    stopConsolidateInterval = null;
    unsubSyncToSidecar = null;
    unsubConsolidateCheck = null;
    constructor(opts) {
        const agentDir = opts.agentDir ?? resolveMemoryAgentDir();
        this.store = new MemoryStore({ agentDir });
        this.sidecarPaths = resolveSidecarPaths(agentDir);
        this.isSubagent = isSubagentSession(opts.ctx);
        this.sessionId = opts.ctx.sessionManager.getSessionFile() ?? null;
    }
    getLlm() {
        return this.llmClient;
    }
    getSessionMemoryCap() {
        return this.sessionMemoryCap;
    }
    getTurnPreflight() {
        return this.turnPreflight;
    }
    async bootstrap(ctx, pi) {
        this.isFirstTurn = true;
        this.turnPreflight = null;
        await this.refreshLlm(ctx, pi);
        await this.store.ensureInitialized();
        void syncMaintenanceScheduler({ agentDir: this.store.agentDir });
        try {
            const sidecar = await bootstrapSidecar({
                store: this.store,
                sidecarPaths: this.sidecarPaths,
                reindexScheduler: this.reindexScheduler,
            });
            this.reindexScheduler = sidecar.reindexScheduler;
            this.unsubSyncToSidecar = sidecar.unsubSyncToSidecar;
            const consolidate = bootstrapConsolidate({
                store: this.store,
                getLlm: () => this.llmClient,
                onComplete: () => this.reloadSessionMemoryCap(),
                stopExistingInterval: this.stopConsolidateInterval,
            });
            this.consolidateScheduler = consolidate.consolidateScheduler;
            this.stopConsolidateInterval = consolidate.stopConsolidateInterval;
            this.unsubConsolidateCheck = consolidate.unsubConsolidateCheck;
            await this.reloadSessionMemoryCap();
        }
        catch {
            // sidecar optional; preflight falls back to MEMORY.md
        }
    }
    async refreshLlm(ctx, pi) {
        const env = readPiMemoryEnv();
        const flagModel = pi.getFlag("memory-helper-model");
        const modelSpec = typeof flagModel === "string" ? flagModel : env.helperModel;
        this.llmClient = await createLlmClient({ ctx, modelSpec, env });
    }
    async runBeforeAgentStart(event, ctx) {
        const userPayload = String(event.prompt ?? "").trim();
        if (!userPayload)
            return;
        const forceHelper = this.isFirstTurn;
        this.isFirstTurn = false;
        if (this.isSubagent) {
            this.turnPreflight = { userPayload, privateContext: this.sessionMemoryCap ?? "" };
            return;
        }
        const workingUi = ctx.hasUI
            ? {
                show: (msg) => ctx.ui.setWorkingMessage(msg),
                update: (msg) => ctx.ui.setWorkingMessage(msg),
                clear: () => ctx.ui.setWorkingMessage(),
            }
            : null;
        try {
            workingUi?.show("Recalling memory…");
            const env = readPiMemoryEnv();
            const result = await runEpisodicPreflight(userPayload, {
                socketPath: this.sidecarPaths.socketPath,
                agentDir: this.store.agentDir,
                store: this.store,
                llm: this.llmClient,
                forceEpisodic: forceHelper,
                sessionId: this.sessionId ?? undefined,
                budgetMs: env.preflightBudgetMs,
                signal: ctx.signal,
                onProgress: workingUi?.update,
            });
            // PATCH-H1 (2026-10-21): fallback 产物是 MEMORY.md 全文，与 sessionMemoryCap 同源——
            // 不跳过的话同一份内容注入两遍（实测双 private_memory 块 ≈15K chars 重复）。
            const episodicContext = result && !result.usedFallback ? (result.privateContext || null) : null;
            const combined = mergePrivateMemoryBlocks(this.sessionMemoryCap, episodicContext);
            this.turnPreflight = { userPayload, privateContext: combined ?? "" };
        }
        finally {
            workingUi?.clear();
        }
    }
    async runContext(event, ctx) {
        const userIndex = findLastUserMessageIndex(event.messages);
        if (userIndex < 0)
            return;
        const scaffolded = getUserMessageText(event.messages[userIndex]);
        if (!scaffolded?.trim())
            return;
        let privateContext;
        let userPayload;
        if (this.turnPreflight && this.turnPreflight.userPayload === scaffolded.trim()) {
            privateContext = this.turnPreflight.privateContext || undefined;
            userPayload = this.turnPreflight.userPayload;
        }
        else {
            const userTurnCount = event.messages.filter((message) => message.role === "user").length;
            const env = readPiMemoryEnv();
            if (this.isSubagent) {
                privateContext = this.sessionMemoryCap ?? undefined;
                userPayload = scaffolded;
                this.turnPreflight = { userPayload: scaffolded, privateContext: privateContext ?? "" };
            }
            else {
                const preflight = await runEpisodicPreflight(scaffolded, {
                    socketPath: this.sidecarPaths.socketPath,
                    agentDir: this.store.agentDir,
                    store: this.store,
                    llm: this.llmClient,
                    forceEpisodic: userTurnCount === 1,
                    sessionId: this.sessionId ?? undefined,
                    budgetMs: env.preflightBudgetMs,
                    signal: ctx.signal,
                });
                privateContext =
                    mergePrivateMemoryBlocks(this.sessionMemoryCap, preflight && !preflight.usedFallback ? preflight.privateContext : undefined) || undefined;
                userPayload = scaffolded;
                this.turnPreflight = { userPayload: scaffolded, privateContext: privateContext ?? "" };
            }
        }
        if (!privateContext)
            return;
        const injectedText = injectPrivateMemoryContext(scaffolded, userPayload, privateContext);
        const messages = [...event.messages];
        messages[userIndex] = setUserMessageText(messages[userIndex], injectedText);
        return { messages };
    }
    async shutdown(event, ctx) {
        const header = ctx.sessionManager.getHeader();
        void enqueueShutdownMetadata(this.store.agentDir, {
            sessionFile: ctx.sessionManager.getSessionFile() ?? "",
            parentSession: readParentSession(header),
            reason: event.reason,
            isSubagent: this.isSubagent,
            enqueuedAt: formatTimestamp(),
        }).catch(() => { });
        if (this.sessionId) {
            queryIntentCache.clearSession(this.sessionId);
        }
    }
    async reloadSessionMemoryCap() {
        this.sessionMemoryCap = await loadSessionMemoryCap(this.store);
    }
    async dispose() {
        this.stopConsolidateInterval?.();
        this.stopConsolidateInterval = null;
        this.unsubSyncToSidecar?.();
        this.unsubSyncToSidecar = null;
        this.unsubConsolidateCheck?.();
        this.unsubConsolidateCheck = null;
        this.consolidateScheduler = null;
        this.reindexScheduler = null;
        this.llmClient = null;
        this.sessionMemoryCap = null;
        this.turnPreflight = null;
        this.isFirstTurn = false;
        try {
            await stopSidecar();
        }
        catch {
            // ignore shutdown errors
        }
    }
}
export function createMemoryRuntime(opts) {
    return new MemoryRuntimeImpl(opts);
}
//# sourceMappingURL=createMemoryRuntime.js.map