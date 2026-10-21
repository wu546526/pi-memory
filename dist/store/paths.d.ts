export type AgentPaths = {
    agentDir: string;
    memoryFile: string;
    memoryGcFile: string;
    compactionStateFile: string;
};
export declare function resolveAgentDir(agentDir: string): string;
export declare function getAgentPaths(agentDir: string, memoryFileName?: string): AgentPaths;
export declare function isAutoOverflowFile(name: string): boolean;
//# sourceMappingURL=paths.d.ts.map