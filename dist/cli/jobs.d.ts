import type { CliLog } from "./log.js";
import type { LlmClient } from "../adapters/llm/types.js";
import type { MemoryStore } from "../store/memoryStore.js";
export type MaintenanceCliOptions = {
    cron: boolean;
    force: boolean;
    verbose: boolean;
};
export declare function runMaintenanceCommand(opts: {
    store: MemoryStore;
    agentDir: string;
    llm: LlmClient | null;
    options: MaintenanceCliOptions;
    log: CliLog;
}): Promise<number>;
export declare function runDrainShutdownQueueCommand(opts: {
    store: MemoryStore;
    agentDir: string;
    llm: LlmClient | null;
    verbose: boolean;
    log: CliLog;
}): Promise<number>;
export declare function runConsolidateCommand(opts: {
    store: MemoryStore;
    agentDir: string;
    llm: LlmClient | null;
    cron: boolean;
    force: boolean;
    verbose: boolean;
    log: CliLog;
}): Promise<number>;
//# sourceMappingURL=jobs.d.ts.map