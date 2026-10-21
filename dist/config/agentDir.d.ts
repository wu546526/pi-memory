export type ResolveMemoryAgentDirOptions = {
    env?: NodeJS.ProcessEnv;
};
/**
 * Memory data root: `PI_MEMORY_AGENT_DIR` when set, otherwise ~/.pi/pi-memory-data.
 * All MEMORY.md, sidecar socket, and `memory.vec.sqlite` live under this path.
 */
export declare function resolveMemoryAgentDir(options?: ResolveMemoryAgentDirOptions): string;
/** CLI: explicit flag, then `resolveMemoryAgentDir`. */
export declare function resolveAgentDirFromEnv(explicit?: string, env?: NodeJS.ProcessEnv): string;
//# sourceMappingURL=agentDir.d.ts.map