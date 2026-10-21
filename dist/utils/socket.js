import { chmodSync, unlinkSync } from "node:fs";
import { secureFileMode } from "./paths.js";
import { isUnixLike } from "./platform.js";
/** Remove stale socket file before bind (Unix domain sockets only). */
export function removeSocketFile(socketPath) {
    if (!isUnixLike())
        return;
    try {
        unlinkSync(socketPath);
    }
    catch {
        // ENOENT or in-use; listen() will surface real errors
    }
}
/** Restrict socket permissions after bind (Unix only). */
export function secureSocketPath(socketPath) {
    const mode = secureFileMode();
    if (mode === undefined)
        return;
    chmodSync(socketPath, mode);
}
/** Remove socket and pid companion files on shutdown. */
export function cleanupSocketFiles(socketPath, pidPath) {
    for (const path of [socketPath, pidPath]) {
        if (!path)
            continue;
        try {
            unlinkSync(path);
        }
        catch {
            // already gone
        }
    }
}
//# sourceMappingURL=socket.js.map