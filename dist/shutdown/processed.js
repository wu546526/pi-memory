import { SHUTDOWN_PROCESSED_FILE } from "../constants/memory.js";
import { joinPath, readText, writeText } from "../utils/fs.js";
export function shutdownProcessedPath(agentDir) {
    return joinPath(agentDir, SHUTDOWN_PROCESSED_FILE);
}
export async function readShutdownProcessedState(agentDir) {
    const raw = await readText(shutdownProcessedPath(agentDir));
    if (!raw.trim())
        return { processed: [] };
    try {
        const parsed = JSON.parse(raw);
        return { processed: Array.isArray(parsed.processed) ? parsed.processed : [] };
    }
    catch {
        return { processed: [] };
    }
}
export async function markShutdownProcessed(agentDir, sessionFile) {
    const state = await readShutdownProcessedState(agentDir);
    if (!state.processed.includes(sessionFile)) {
        state.processed.push(sessionFile);
    }
    await writeText(shutdownProcessedPath(agentDir), JSON.stringify(state, null, 2));
}
export function isShutdownProcessed(state, sessionFile) {
    return state.processed.includes(sessionFile);
}
//# sourceMappingURL=processed.js.map