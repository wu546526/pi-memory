import { getVecStore } from "./vec/store.js";
export function handleStats(ctx) {
    const store = getVecStore(ctx.dbPath);
    const meta = store.getStoredEmbeddingMeta();
    return {
        type: "stats_ok",
        index_generation: store.getIndexGeneration(),
        chunk_count: store.getChunkCount(),
        ...(meta
            ? {
                embedding_provider: meta.provider,
                embedding_model: meta.model,
                embedding_dim: meta.dim,
            }
            : {}),
    };
}
//# sourceMappingURL=stats.js.map