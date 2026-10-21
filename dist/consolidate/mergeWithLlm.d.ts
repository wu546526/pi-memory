import type { LlmClient } from "../adapters/llm/types.js";
import type { ParsedEntry } from "../store/types.js";
export declare function mergeEntriesWithLlm(entries: ParsedEntry[], llm: LlmClient, signal?: AbortSignal): Promise<ParsedEntry[]>;
//# sourceMappingURL=mergeWithLlm.d.ts.map