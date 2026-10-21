import { debounce } from "es-toolkit";
import { DEFAULT_CONSOLIDATE_CHECK_INTERVAL_MS, DEFAULT_CONSOLIDATE_DEBOUNCE_MS } from "../constants/timing.js";
import { runConsolidateJob } from "./runJob.js";
export function createConsolidateScheduler(opts) {
    const runNow = async (runOpts = {}) => {
        const store = opts.getStore();
        const agentDir = opts.getAgentDir();
        if (!store || !agentDir)
            return;
        const result = await runConsolidateJob({
            store,
            agentDir,
            llm: opts.getLlm(),
            cronFired: runOpts.cronFired ?? false,
            reindex: true,
        });
        if (result.status === "consolidated") {
            await opts.onComplete?.();
        }
    };
    const schedule = debounce(() => {
        void runNow();
    }, opts.debounceMs ?? DEFAULT_CONSOLIDATE_DEBOUNCE_MS);
    return { schedule, runNow };
}
/** Periodic check for the 7-day (and other time-based) consolidate conditions. */
export function startConsolidateInterval(tick, intervalMs = DEFAULT_CONSOLIDATE_CHECK_INTERVAL_MS) {
    const timer = setInterval(tick, intervalMs);
    timer.unref?.();
    return () => clearInterval(timer);
}
//# sourceMappingURL=scheduler.js.map