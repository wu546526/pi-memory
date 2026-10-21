import { buildSessionContext, convertToLlm, getLatestCompactionEntry, parseSessionEntries, serializeConversation, } from "@earendil-works/pi-coding-agent";
import { stripPrivateMemoryFromMessages } from "../utils/memory/index.js";
import { readTextRequired } from "../utils/fs.js";
function toSessionEntries(fileEntries) {
    return fileEntries.filter((entry) => entry.type !== "session");
}
function resolveLeafId(entries) {
    return entries.at(-1)?.id ?? null;
}
export async function readSessionConversationText(sessionFile) {
    const content = await readTextRequired(sessionFile);
    const fileEntries = parseSessionEntries(content);
    const entries = toSessionEntries(fileEntries);
    if (entries.length === 0)
        return null;
    const context = buildSessionContext(entries, resolveLeafId(entries));
    const messages = stripPrivateMemoryFromMessages(context.messages);
    if (messages.length === 0)
        return null;
    return serializeConversation(convertToLlm(messages));
}
export async function readLatestCompactionSummary(sessionFile) {
    const content = await readTextRequired(sessionFile);
    const fileEntries = parseSessionEntries(content);
    const entries = toSessionEntries(fileEntries);
    const compaction = getLatestCompactionEntry(entries);
    if (!compaction?.summary?.trim())
        return null;
    return { compactionId: compaction.id, summary: compaction.summary };
}
//# sourceMappingURL=sessionReader.js.map