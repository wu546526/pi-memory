import { type ConsolidateScheduler } from "../consolidate/scheduler.js";
import type { LlmClient } from "../adapters/llm/types.js";
import { mergePrivateMemoryBlocks } from "../preflight/render.js";
import { type ReindexScheduler } from "../sidecar/reindexBridge.js";
import type { SidecarPaths } from "../sidecar/paths.js";
import type { MemoryStore } from "../store/memoryStore.js";
export type SidecarBootstrapResult = {
    reindexScheduler: ReindexScheduler;
    unsubSyncToSidecar: () => void;
};
export declare function bootstrapSidecar(opts: {
    store: MemoryStore;
    sidecarPaths: SidecarPaths;
    reindexScheduler: ReindexScheduler | null;
}): Promise<SidecarBootstrapResult>;
export type ConsolidateBootstrapResult = {
    consolidateScheduler: ConsolidateScheduler;
    stopConsolidateInterval: () => void;
    unsubConsolidateCheck: () => void;
};
export declare function bootstrapConsolidate(opts: {
    store: MemoryStore;
    getLlm: () => LlmClient | null;
    onComplete: () => Promise<void>;
    stopExistingInterval: (() => void) | null;
}): ConsolidateBootstrapResult;
export declare function loadSessionMemoryCap(store: MemoryStore): Promise<string | null>;
export { mergePrivateMemoryBlocks };
//# sourceMappingURL=lifecycle.d.ts.map