import { expandHomePath } from "../utils/paths.js";
import { joinPath } from "../utils/fs.js";
import { AUTO_FILE_PREFIX, COMPACTION_STATE_FILE, DEFAULT_MEMORY_FILE, MEMORY_GC_FILE, } from "../constants/memory.js";
export function resolveAgentDir(agentDir) {
    return expandHomePath(agentDir);
}
export function getAgentPaths(agentDir, memoryFileName = DEFAULT_MEMORY_FILE) {
    const resolved = resolveAgentDir(agentDir);
    return {
        agentDir: resolved,
        memoryFile: joinPath(resolved, memoryFileName),
        memoryGcFile: joinPath(resolved, MEMORY_GC_FILE),
        compactionStateFile: joinPath(resolved, COMPACTION_STATE_FILE),
    };
}
export function isAutoOverflowFile(name) {
    return name.startsWith(AUTO_FILE_PREFIX) && name.endsWith(".md");
}
//# sourceMappingURL=paths.js.map