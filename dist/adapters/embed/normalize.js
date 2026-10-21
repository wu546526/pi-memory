export function normalizeEmbedding(vec) {
    let norm = 0;
    for (let i = 0; i < vec.length; i++)
        norm += vec[i] * vec[i];
    norm = Math.sqrt(norm) || 1;
    for (let i = 0; i < vec.length; i++)
        vec[i] /= norm;
    return vec;
}
export function assertEmbeddingDim(embedding, expectedDim, label) {
    if (embedding.length !== expectedDim) {
        throw new Error(`${label} dimension mismatch: expected ${expectedDim}, got ${embedding.length}`);
    }
}
//# sourceMappingURL=normalize.js.map