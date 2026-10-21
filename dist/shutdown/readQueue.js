import { parseJsonlLine } from "../utils/jsonl.js";
import { readText } from "../utils/fs.js";
import { shutdownQueuePath } from "./enqueue.js";
/** Latest queue row per session file (deduped). */
export async function readShutdownQueueEntries(agentDir) {
    const raw = await readText(shutdownQueuePath(agentDir));
    if (!raw.trim())
        return [];
    const bySession = new Map();
    for (const line of raw.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed)
            continue;
        try {
            const entry = parseJsonlLine(trimmed);
            if (!entry.sessionFile?.trim())
                continue;
            bySession.set(entry.sessionFile, entry);
        }
        catch {
            // skip malformed lines
        }
    }
    return [...bySession.values()];
}
//# sourceMappingURL=readQueue.js.map