import { readPiMemoryEnv } from "../config/index.js";
import { readPreflightRuntimeConfig } from "../config/preflight.js";
import { createConsolidateScheduler, startConsolidateInterval, } from "../consolidate/scheduler.js";
import { mergePrivateMemoryBlocks, renderMemoryCapPrivateMemory } from "../preflight/render.js";
import { createReindexScheduler } from "../sidecar/reindexBridge.js";
import { ensureSidecarRunning } from "../sidecar/sidecarManager.js";
import { warmSidecar } from "../sidecar/warmup.js";
export async function bootstrapSidecar(opts) {
    await ensureSidecarRunning({
        socketPath: opts.sidecarPaths.socketPath,
        dbPath: opts.sidecarPaths.dbPath,
    });
    if (readPreflightRuntimeConfig().warmSidecar) {
        try {
            await warmSidecar(opts.sidecarPaths.socketPath);
        }
        catch {
            // warm is best-effort
        }
    }
    const reindexScheduler = opts.reindexScheduler ??
        createReindexScheduler({
            sidecar: opts.sidecarPaths,
            agentDir: opts.store.agentDir,
            getDocuments: () => opts.store.exportForIndex(),
            debounceMs: readPiMemoryEnv().reindexDebounceMs,
        });
    const unsubSyncToSidecar = opts.store.onSyncToSidecar(() => reindexScheduler.schedule());
    // Fire-and-forget: the initial runNow re-embeds the whole memory file when it
    // changed, which with a remote embedder can take seconds. Session startup
    // (session_start) must not block on it — preflight already falls back to
    // MEMORY.md while the index is being rebuilt.
    void reindexScheduler.runNow();
    return { reindexScheduler, unsubSyncToSidecar };
}
export function bootstrapConsolidate(opts) {
    const consolidateScheduler = createConsolidateScheduler({
        getStore: () => opts.store,
        getAgentDir: () => opts.store.agentDir,
        getLlm: opts.getLlm,
        debounceMs: readPiMemoryEnv().consolidateDebounceMs,
        onComplete: opts.onComplete,
    });
    const unsubConsolidateCheck = opts.store.onConsolidateCheck(() => consolidateScheduler.schedule());
    opts.stopExistingInterval?.();
    const stopConsolidateInterval = startConsolidateInterval(() => {
        void consolidateScheduler.runNow();
    });
    void consolidateScheduler.runNow();
    return { consolidateScheduler, stopConsolidateInterval, unsubConsolidateCheck };
}
export async function loadSessionMemoryCap(store) {
    const fallback = await store.readForFallback();
    return renderMemoryCapPrivateMemory(fallback) || null;
}
export { mergePrivateMemoryBlocks };
//# sourceMappingURL=lifecycle.js.map