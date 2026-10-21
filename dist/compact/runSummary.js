import { convertToLlm, serializeConversation } from "@earendil-works/pi-coding-agent";
import { stripPrivateMemoryFromMessages } from "../utils/memory/index.js";
import { buildCompactionSummaryPrompt } from "./summaryPrompt.js";
export async function runDualPurposeCompactionSummary(preparation, llm, signal) {
    const allMessages = stripPrivateMemoryFromMessages([
        ...preparation.messagesToSummarize,
        ...preparation.turnPrefixMessages,
    ]);
    const conversationText = serializeConversation(convertToLlm(allMessages));
    const prompt = buildCompactionSummaryPrompt(conversationText, preparation.previousSummary);
    const summary = await llm.complete(prompt, signal);
    return summary.trim() || null;
}
//# sourceMappingURL=runSummary.js.map