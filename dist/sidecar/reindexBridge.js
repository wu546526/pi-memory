import { debounce } from "es-toolkit";
import { DEFAULT_REINDEX_DEBOUNCE_MS } from "../constants/timing.js";
import { sidecarQueryCache } from "./queryCache.js";
import { ensureSidecarRunning } from "./sidecarManager.js";
import { reindex } from "./client.js";
export function createReindexScheduler(opts) {
    let running = false;
    let pending = false;
    const runNow = async () => {
        if (running) {
            pending = true;
            return;
        }
        running = true;
        try {
            await ensureSidecarRunning(opts.sidecar);
            const documents = await opts.getDocuments();
            const result = await reindex(opts.sidecar.socketPath, documents);
            sidecarQueryCache.onReindexComplete(opts.agentDir, result.index_generation);
        }
        catch {
            // fail-silent; preflight falls back to MEMORY.md
        }
        finally {
            running = false;
            if (pending) {
                pending = false;
                await runNow();
            }
        }
    };
    const schedule = debounce(() => {
        void runNow();
    }, opts.debounceMs ?? DEFAULT_REINDEX_DEBOUNCE_MS);
    return { schedule, runNow };
}
//# sourceMappingURL=reindexBridge.js.map