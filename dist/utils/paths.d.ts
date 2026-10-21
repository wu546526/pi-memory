import { CONFIG_DIR_NAME, getAgentDir } from "@earendil-works/pi-coding-agent";
export { CONFIG_DIR_NAME, getAgentDir };
/** Expand leading `~` or `~/` using the current user's home directory. */
export declare function expandHomePath(input: string): string;
/** Pi user config root (~/.pi). Uses Pi's CONFIG_DIR_NAME. */
export declare function defaultPiConfigDir(): string;
/** Memory data root: ~/.pi/pi-memory-data */
export declare function defaultMemoryAgentDir(): string;
/** pi-memory config: ~/.pi/agent/pi-memory.env */
export declare function defaultPiMemoryEnvFile(): string;
/** Maintenance logs live under the memory agent dir (`<agentDir>/logs`). */
export declare function resolvePiLogsDir(agentDir: string): string;
export declare function defaultPiLogsDir(): string;
export declare function resolveConsolidateLogPath(agentDir: string): string;
export declare function defaultConsolidateLogPath(): string;
export declare function resolveConsolidateErrLogPath(agentDir: string): string;
export declare function defaultConsolidateErrLogPath(): string;
/** Directory mode for agent / socket parent dirs (Unix only; ignored on Windows). */
export declare function secureDirMode(): number | undefined;
/** File mode for socket files (Unix only; ignored on Windows). */
export declare function secureFileMode(): number | undefined;
export declare function mkdirOptions(): {
    recursive: true;
    mode?: number;
};
//# sourceMappingURL=paths.d.ts.map