import type { ConsolidateStoreAccess } from "../store/consolidatePort.js";
/** Ensure sidecar is up, reindex from store export, and invalidate query cache. */
export declare function syncSidecarIndex(agentDir: string, store: Pick<ConsolidateStoreAccess, "exportForIndex">): Promise<number>;
//# sourceMappingURL=syncIndex.d.ts.map