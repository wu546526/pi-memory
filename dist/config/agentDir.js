import { defaultMemoryAgentDir, expandHomePath } from "../utils/paths.js";
import { readPiMemoryEnv } from "./env.js";
/**
 * Memory data root: `PI_MEMORY_AGENT_DIR` when set, otherwise ~/.pi/pi-memory-data.
 * All MEMORY.md, sidecar socket, and `memory.vec.sqlite` live under this path.
 */
export function resolveMemoryAgentDir(options = {}) {
    const env = options.env ?? process.env;
    const fromEnv = readPiMemoryEnv(env).agentDir?.trim();
    if (fromEnv)
        return expandHomePath(fromEnv);
    return defaultMemoryAgentDir();
}
/** CLI: explicit flag, then `resolveMemoryAgentDir`. */
export function resolveAgentDirFromEnv(explicit, env = process.env) {
    const fromArg = explicit?.trim();
    if (fromArg)
        return expandHomePath(fromArg);
    return resolveMemoryAgentDir({ env });
}
//# sourceMappingURL=agentDir.js.map