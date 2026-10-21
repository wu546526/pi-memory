import { SHUTDOWN_QUEUE_FILE } from "../constants/memory.js";
import { serializeJsonlFrame } from "../utils/jsonl.js";
import { appendText, joinPath } from "../utils/fs.js";
export { readParentSession } from "../utils/session/index.js";
export function shutdownQueuePath(agentDir) {
    return joinPath(agentDir, SHUTDOWN_QUEUE_FILE);
}
export async function enqueueShutdownMetadata(agentDir, entry) {
    await appendText(shutdownQueuePath(agentDir), serializeJsonlFrame(entry));
}
//# sourceMappingURL=enqueue.js.map