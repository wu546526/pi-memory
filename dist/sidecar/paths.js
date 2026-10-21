import { fileURLToPath } from "node:url";
import { SIDECAR_DB_FILE, SIDECAR_SOCKET_FILE } from "../constants/paths.js";
import { canRead, joinPath, pathDirname } from "../utils/fs.js";
export function resolveSidecarPaths(agentDir) {
    return {
        socketPath: joinPath(agentDir, SIDECAR_SOCKET_FILE),
        dbPath: joinPath(agentDir, SIDECAR_DB_FILE),
    };
}
/** Resolve compiled sidecar entry (dist/sidecar/server/process.js). */
export function resolveSidecarEntry() {
    const here = pathDirname(fileURLToPath(import.meta.url));
    const candidates = [
        joinPath(here, "server/process.js"),
        joinPath(here, "../../dist/sidecar/server/process.js"),
    ];
    for (const entry of candidates) {
        if (canRead(entry))
            return entry;
    }
    throw new Error("Sidecar entry not found; run `pnpm build` first");
}
//# sourceMappingURL=paths.js.map