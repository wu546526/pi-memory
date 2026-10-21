import type { LlmClient } from "../adapters/llm/types.js";
import type { MemoryStore } from "../store/memoryStore.js";
export type EpisodicPreflightOptions = {
    socketPath: string;
    agentDir: string;
    store: MemoryStore;
    llm?: LlmClient | null;
    /** Force episodic gate (first turn); does not force helper LLM. */
    forceEpisodic?: boolean;
    /** Force helper LLM intent extraction. */
    forceIntent?: boolean;
    /** @deprecated Use forceEpisodic */
    force?: boolean;
    sessionId?: string;
    budgetMs?: number;
    signal?: AbortSignal;
    onProgress?: (message: string) => void;
};
export type EpisodicPreflightResult = {
    privateContext: string;
    /** fallback 命中时 privateContext 实为 MEMORY.md 全文，与 sessionMemoryCap 同源——merge 层据此跳过以免双份注入。 */
    usedFallback: boolean;
};
/**
 * Fail-silent episodic preflight: QueryIntent (optional) → buildRetrievalQuery → sidecar.query → fallback.
 */
export declare function runEpisodicPreflight(userInput: string, options: EpisodicPreflightOptions): Promise<EpisodicPreflightResult | null>;
//# sourceMappingURL=episodic.d.ts.map