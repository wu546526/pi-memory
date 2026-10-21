export type RetrievalConfig = {
    topK: number;
    mmrLambda: number;
    minRelevance: number;
    candidatePoolMultiplier: number;
};
/** Vector retrieval tuning (sidecar query path). */
export declare function readRetrievalConfig(env?: NodeJS.ProcessEnv): RetrievalConfig;
export { DEFAULT_MIN_RELEVANCE, DEFAULT_TOP_K, MMR_LAMBDA } from "../constants/retrieval.js";
//# sourceMappingURL=retrieval.d.ts.map