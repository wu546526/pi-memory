import type { ParsedEntry, StoreMemoryEntry } from "../store/types.js";
/** Keep only Memory Export facts not already present in MEMORY (parent/root dedup). */
export declare function filterCompactionDelta(entries: StoreMemoryEntry[], existing: ParsedEntry[]): StoreMemoryEntry[];
/** Subagent clone: summary had export bullets but nothing new vs parent memory. */
export declare function shouldSkipSubagentCompactionIngest(parsed: StoreMemoryEntry[], delta: StoreMemoryEntry[]): boolean;
//# sourceMappingURL=subagentDelta.d.ts.map