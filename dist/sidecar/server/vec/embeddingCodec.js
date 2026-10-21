export function embeddingToBlob(embedding) {
    return Buffer.from(embedding.buffer, embedding.byteOffset, embedding.byteLength);
}
export function blobToEmbedding(blob) {
    return new Float32Array(blob.buffer, blob.byteOffset, blob.byteLength / 4);
}
//# sourceMappingURL=embeddingCodec.js.map