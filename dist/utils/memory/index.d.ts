import type { AgentMessage } from "@earendil-works/pi-agent-core";
/** Stable dedupe key for memory entries (section + trimmed content). */
export declare function entryDedupeKey(entry: {
    section: string;
    content: string;
}): string;
/** Remove `<private_memory>...</private_memory>` blocks from plain text. */
export declare function stripPrivateMemory(text: string): string;
/** Strip private memory tags from user message text blocks before compaction or drain. */
export declare function stripPrivateMemoryFromMessages(messages: AgentMessage[]): AgentMessage[];
//# sourceMappingURL=index.d.ts.map