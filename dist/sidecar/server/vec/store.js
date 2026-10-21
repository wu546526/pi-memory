import { createRequire } from "node:module";
import { ensureDirSync, pathDirname } from "../../../utils/fs.js";
import { queryChunks } from "./chunkQuery.js";
import { reindexChunks } from "./chunkReindex.js";
import { embeddingMetaMatches, getChunkCount, getIndexGeneration, getLastReindexFingerprint, getStoredEmbeddingMeta, initVecSchema, setLastReindexFingerprint, } from "./schema.js";
const require = createRequire(import.meta.url);
export class VecStore {
    db;
    constructor(dbPath) {
        ensureDirSync(pathDirname(dbPath));
        const Database = require("better-sqlite3");
        this.db = new Database(dbPath);
        initVecSchema(this.db);
    }
    getStoredEmbeddingMeta() {
        return getStoredEmbeddingMeta(this.db);
    }
    embeddingMetaMatches(embedder) {
        return embeddingMetaMatches(this.db, embedder);
    }
    getIndexGeneration() {
        return getIndexGeneration(this.db);
    }
    getLastReindexFingerprint() {
        return getLastReindexFingerprint(this.db);
    }
    setLastReindexFingerprint(fingerprint) {
        setLastReindexFingerprint(this.db, fingerprint);
    }
    getChunkCount() {
        return getChunkCount(this.db);
    }
    reindex(documents) {
        return reindexChunks(this.db, documents);
    }
    query(queryText, topK) {
        return queryChunks(this.db, queryText, topK);
    }
    close() {
        this.db.close();
    }
}
const stores = new Map();
export function getVecStore(dbPath) {
    let store = stores.get(dbPath);
    if (!store) {
        store = new VecStore(dbPath);
        stores.set(dbPath, store);
    }
    return store;
}
/** @internal test hook */
export function resetVecStoreForTests() {
    for (const store of stores.values())
        store.close();
    stores.clear();
}
//# sourceMappingURL=store.js.map