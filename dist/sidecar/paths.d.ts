export type SidecarPaths = {
    socketPath: string;
    dbPath: string;
};
export declare function resolveSidecarPaths(agentDir: string): SidecarPaths;
/** Resolve compiled sidecar entry (dist/sidecar/server/process.js). */
export declare function resolveSidecarEntry(): string;
//# sourceMappingURL=paths.d.ts.map