import type { SessionBeforeCompactEvent } from "@earendil-works/pi-coding-agent";
import type { LlmClient } from "../adapters/llm/types.js";
type CompactionPreparation = SessionBeforeCompactEvent["preparation"];
export declare function runDualPurposeCompactionSummary(preparation: CompactionPreparation, llm: LlmClient, signal?: AbortSignal): Promise<string | null>;
export {};
//# sourceMappingURL=runSummary.d.ts.map