export type ShutdownProcessedState = {
    processed: string[];
};
export type ShutdownSkipReason = "missing_session" | "compaction_already_ingested" | "subagent_no_delta" | "no_export" | "no_llm" | "ingested_compaction" | "ingested_llm";
export declare function shutdownProcessedPath(agentDir: string): string;
export declare function readShutdownProcessedState(agentDir: string): Promise<ShutdownProcessedState>;
export declare function markShutdownProcessed(agentDir: string, sessionFile: string): Promise<void>;
export declare function isShutdownProcessed(state: ShutdownProcessedState, sessionFile: string): boolean;
//# sourceMappingURL=processed.d.ts.map