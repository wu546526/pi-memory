import { syncSidecarIndex } from "../sidecar/syncIndex.js";
import { mergeMemoryEntries } from "./mergeMemoryEntries.js";
const NOOP_LLM = {
    async complete() {
        throw new Error("LLM unavailable");
    },
};
export async function runConsolidateJob(opts) {
    const llm = opts.llm ?? NOOP_LLM;
    if (opts.store.isConsolidating()) {
        return { status: "skipped", reason: "already_consolidating" };
    }
    if (!opts.force && !(await opts.store.shouldConsolidate(undefined, opts.cronFired))) {
        return { status: "skipped", reason: "conditions_not_met" };
    }
    const before = await opts.store.getStats();
    try {
        await mergeMemoryEntries(opts.store, llm);
        let indexGeneration;
        if (opts.reindex !== false) {
            indexGeneration = await syncSidecarIndex(opts.agentDir, opts.store);
        }
        const after = await opts.store.getStats();
        return {
            status: "consolidated",
            stats: {
                entriesBefore: before.entryCount,
                entriesAfter: after.entryCount,
                overflowBefore: before.overflowFileCount,
                overflowAfter: after.overflowFileCount,
                indexGeneration,
            },
        };
    }
    catch (error) {
        return {
            status: "failed",
            error: error instanceof Error ? error : new Error(String(error)),
        };
    }
}
//# sourceMappingURL=runJob.js.map