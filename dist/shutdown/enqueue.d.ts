import type { SessionShutdownEvent } from "@earendil-works/pi-coding-agent";
export { readParentSession } from "../utils/session/index.js";
export type ShutdownQueueEntry = {
    sessionFile: string;
    parentSession?: string;
    reason: SessionShutdownEvent["reason"];
    isSubagent: boolean;
    enqueuedAt: string;
};
export declare function shutdownQueuePath(agentDir: string): string;
export declare function enqueueShutdownMetadata(agentDir: string, entry: ShutdownQueueEntry): Promise<void>;
//# sourceMappingURL=enqueue.d.ts.map