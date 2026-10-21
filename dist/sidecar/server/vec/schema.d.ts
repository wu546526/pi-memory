import type { Embedder } from "../../../adapters/embed/types.js";
type VecDatabase = import("better-sqlite3").Database;
export type StoredEmbeddingMeta = {
    model: string;
    provider: string;
    dim: number;
};
export type ReindexOutcome = {
    indexed: number;
    indexGeneration: number;
};
export declare function initVecSchema(db: VecDatabase): void;
export declare function getStoredEmbeddingMeta(db: VecDatabase): StoredEmbeddingMeta | null;
export declare function embeddingMetaMatches(db: VecDatabase, embedder: Embedder): boolean;
export declare function getIndexGeneration(db: VecDatabase): number;
export declare function getChunkCount(db: VecDatabase): number;
export declare function clearChunksIfEmbeddingMismatch(db: VecDatabase, embedder: Embedder): void;
export declare function bumpIndexGeneration(db: VecDatabase): number;
export declare function writeEmbeddingMeta(db: VecDatabase, embedder: Embedder): void;
export declare function getLastReindexFingerprint(db: VecDatabase): string | null;
export declare function setLastReindexFingerprint(db: VecDatabase, fingerprint: string): void;
export {};
//# sourceMappingURL=schema.d.ts.map