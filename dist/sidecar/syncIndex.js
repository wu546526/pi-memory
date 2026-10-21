import { reindex } from "./client.js";
import { sidecarQueryCache } from "./queryCache.js";
import { resolveSidecarPaths } from "./paths.js";
import { ensureSidecarRunning } from "./sidecarManager.js";
/** Ensure sidecar is up, reindex from store export, and invalidate query cache. */
export async function syncSidecarIndex(agentDir, store) {
    const sidecar = resolveSidecarPaths(agentDir);
    await ensureSidecarRunning(sidecar);
    const result = await reindex(sidecar.socketPath, await store.exportForIndex());
    sidecarQueryCache.onReindexComplete(agentDir, result.index_generation);
    return result.index_generation;
}
//# sourceMappingURL=syncIndex.js.map