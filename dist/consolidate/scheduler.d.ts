import type { LlmClient } from "../adapters/llm/types.js";
import type { ConsolidateStoreAccess } from "../store/consolidatePort.js";
export type ConsolidateScheduler = {
    schedule(): void;
    runNow(opts?: {
        cronFired?: boolean;
    }): Promise<void>;
};
export declare function createConsolidateScheduler(opts: {
    getStore(): ConsolidateStoreAccess | null;
    getAgentDir(): string | null;
    getLlm(): LlmClient | null;
    debounceMs?: number;
    onComplete?(): void | Promise<void>;
}): ConsolidateScheduler;
/** Periodic check for the 7-day (and other time-based) consolidate conditions. */
export declare function startConsolidateInterval(tick: () => void, intervalMs?: number): () => void;
//# sourceMappingURL=scheduler.d.ts.map