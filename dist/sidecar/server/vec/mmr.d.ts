export type ScoredCandidate = {
    chunkId: string;
    content: string;
    source: string;
    timestamp: string;
    distance: number;
    embedding: Float32Array;
};
export declare function cosineSimilarity(a: Float32Array, b: Float32Array): number;
/** MMR re-ranking: λ defaults from retrieval config (see constants/retrieval.ts). */
export declare function mmrSelect(queryEmbedding: Float32Array, candidates: ScoredCandidate[], limit: number, lambda?: number): ScoredCandidate[];
export declare function distanceToRelevance(distance: number): number;
//# sourceMappingURL=mmr.d.ts.map