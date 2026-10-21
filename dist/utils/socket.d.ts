/** Remove stale socket file before bind (Unix domain sockets only). */
export declare function removeSocketFile(socketPath: string): void;
/** Restrict socket permissions after bind (Unix only). */
export declare function secureSocketPath(socketPath: string): void;
/** Remove socket and pid companion files on shutdown. */
export declare function cleanupSocketFiles(socketPath: string, pidPath?: string): void;
//# sourceMappingURL=socket.d.ts.map