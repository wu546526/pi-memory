import type { LlmClient } from "../adapters/llm/types.js";
import type { ConsolidateStoreAccess } from "../store/consolidatePort.js";
export type ConsolidateJobStats = {
    entriesBefore: number;
    entriesAfter: number;
    overflowBefore: number;
    overflowAfter: number;
    indexGeneration?: number;
};
export type RunConsolidateJobOptions = {
    store: ConsolidateStoreAccess;
    agentDir: string;
    llm?: LlmClient | null;
    cronFired?: boolean;
    force?: boolean;
    reindex?: boolean;
};
export type RunConsolidateJobResult = {
    status: "skipped";
    reason: "conditions_not_met" | "already_consolidating";
} | {
    status: "consolidated";
    stats: ConsolidateJobStats;
} | {
    status: "failed";
    error: Error;
};
export declare function runConsolidateJob(opts: RunConsolidateJobOptions): Promise<RunConsolidateJobResult>;
//# sourceMappingURL=runJob.d.ts.map