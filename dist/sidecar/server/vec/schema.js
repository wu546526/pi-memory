export function initVecSchema(db) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS memory_chunks (
      chunk_id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      source TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      embedding BLOB NOT NULL
    );
  `);
}
export function getStoredEmbeddingMeta(db) {
    const read = (key) => db.prepare("SELECT value FROM meta WHERE key = ?").pluck().get(key);
    const model = read("embedding_model");
    const provider = read("embedding_provider");
    const dimRaw = read("embedding_dim");
    if (!model || !provider || !dimRaw)
        return null;
    const dim = Number.parseInt(dimRaw, 10);
    if (!Number.isFinite(dim))
        return null;
    return { model, provider, dim };
}
export function embeddingMetaMatches(db, embedder) {
    const stored = getStoredEmbeddingMeta(db);
    if (!stored)
        return true;
    return (stored.model === embedder.model &&
        stored.provider === embedder.provider &&
        stored.dim === embedder.dim);
}
export function getIndexGeneration(db) {
    const raw = db.prepare("SELECT value FROM meta WHERE key = 'index_generation'").pluck().get();
    return Number(raw ?? "0");
}
export function getChunkCount(db) {
    const row = db.prepare("SELECT COUNT(*) AS count FROM memory_chunks").get();
    return row.count;
}
export function clearChunksIfEmbeddingMismatch(db, embedder) {
    if (embeddingMetaMatches(db, embedder))
        return;
    db.prepare("DELETE FROM memory_chunks").run();
}
export function bumpIndexGeneration(db) {
    const generation = getIndexGeneration(db) + 1;
    db
        .prepare("INSERT INTO meta(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
        .run("index_generation", String(generation));
    return generation;
}
export function writeEmbeddingMeta(db, embedder) {
    const upsert = db.prepare("INSERT INTO meta(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
    upsert.run("embedding_model", embedder.model);
    upsert.run("embedding_provider", embedder.provider);
    upsert.run("embedding_dim", String(embedder.dim));
}
const LAST_REINDEX_FINGERPRINT_KEY = "last_reindex_fingerprint";
export function getLastReindexFingerprint(db) {
    const raw = db.prepare("SELECT value FROM meta WHERE key = ?").pluck().get(LAST_REINDEX_FINGERPRINT_KEY);
    return raw ?? null;
}
export function setLastReindexFingerprint(db, fingerprint) {
    db.prepare("INSERT INTO meta(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(LAST_REINDEX_FINGERPRINT_KEY, fingerprint);
}
//# sourceMappingURL=schema.js.map