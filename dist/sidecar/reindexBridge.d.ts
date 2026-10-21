import { type SidecarOpts } from "./sidecarManager.js";
import type { IndexDocument } from "./protocol.js";
export type ReindexScheduler = {
    schedule(): void;
    runNow(): Promise<void>;
};
export declare function createReindexScheduler(opts: {
    sidecar: SidecarOpts;
    agentDir: string;
    getDocuments: () => Promise<IndexDocument[]>;
    debounceMs?: number;
}): ReindexScheduler;
//# sourceMappingURL=reindexBridge.d.ts.map