import { dedupeEntries } from "./mergeEntries.js";
import { mergeEntriesWithLlm } from "./mergeWithLlm.js";
/** Dedupe and optionally LLM-merge MEMORY entries, then rewrite Ground Truth under lock. */
export async function mergeMemoryEntries(store, llm) {
    if (store.isConsolidating())
        return;
    await store.rewriteMemoryUnderLock(async (entries) => {
        let merged = dedupeEntries(entries);
        try {
            merged = await mergeEntriesWithLlm(merged, llm);
        }
        catch {
            // rule-based dedupe only
        }
        return merged;
    });
}
/** Fire-and-forget wrapper around {@link mergeMemoryEntries}. */
export function scheduleMergeMemoryEntriesInBackground(store, llm, opts = {}) {
    void mergeMemoryEntries(store, llm)
        .then(() => opts.onComplete?.())
        .catch(() => { });
}
//# sourceMappingURL=mergeMemoryEntries.js.map