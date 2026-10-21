import type { Embedder } from "../../../adapters/embed/types.js";
import type { IndexDocument, MemoryEntry } from "../../protocol.js";
import { type ReindexOutcome, type StoredEmbeddingMeta } from "./schema.js";
export type { ReindexOutcome, StoredEmbeddingMeta };
export declare class VecStore {
    private db;
    constructor(dbPath: string);
    getStoredEmbeddingMeta(): StoredEmbeddingMeta | null;
    embeddingMetaMatches(embedder: Embedder): boolean;
    getIndexGeneration(): number;
    getLastReindexFingerprint(): string | null;
    setLastReindexFingerprint(fingerprint: string): void;
    getChunkCount(): number;
    reindex(documents: IndexDocument[]): Promise<ReindexOutcome>;
    query(queryText: string, topK?: number): Promise<MemoryEntry[]>;
    close(): void;
}
export declare function getVecStore(dbPath: string): VecStore;
/** @internal test hook */
export declare function resetVecStoreForTests(): void;
//# sourceMappingURL=store.d.ts.map