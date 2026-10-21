import type { LlmClient } from "../adapters/llm/types.js";
import type { ConsolidateStoreAccess } from "../store/consolidatePort.js";
/** Dedupe and optionally LLM-merge MEMORY entries, then rewrite Ground Truth under lock. */
export declare function mergeMemoryEntries(store: ConsolidateStoreAccess, llm: LlmClient): Promise<void>;
/** Fire-and-forget wrapper around {@link mergeMemoryEntries}. */
export declare function scheduleMergeMemoryEntriesInBackground(store: ConsolidateStoreAccess, llm: LlmClient, opts?: {
    onComplete?: () => void | Promise<void>;
}): void;
//# sourceMappingURL=mergeMemoryEntries.d.ts.map