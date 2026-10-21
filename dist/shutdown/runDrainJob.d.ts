import type { LlmClient } from "../adapters/llm/types.js";
import type { MemoryStore } from "../store/memoryStore.js";
export type DrainShutdownQueueStats = {
    queued: number;
    skipped: number;
    ingested: number;
    appended: number;
    indexGeneration?: number;
};
export type RunDrainShutdownQueueOptions = {
    store: MemoryStore;
    agentDir: string;
    llm?: LlmClient | null;
    reindex?: boolean;
};
export type RunDrainShutdownQueueResult = {
    status: "empty";
} | {
    status: "drained";
    stats: DrainShutdownQueueStats;
} | {
    status: "failed";
    error: Error;
};
export declare function runDrainShutdownQueueJob(opts: RunDrainShutdownQueueOptions): Promise<RunDrainShutdownQueueResult>;
//# sourceMappingURL=runDrainJob.d.ts.map