import type { AgentMessage } from "@earendil-works/pi-agent-core";
export declare function getUserMessageText(message: AgentMessage): string | null;
export declare function setUserMessageText(message: AgentMessage, text: string): AgentMessage;
export declare function findLastUserMessageIndex(messages: AgentMessage[]): number;
//# sourceMappingURL=messageUtils.d.ts.map