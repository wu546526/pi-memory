import { postJson } from "../http.js";
import { assertEmbeddingDim, normalizeEmbedding } from "./normalize.js";
export function createOpenAiEmbedder(opts) {
    const embedRemote = async (texts) => {
        const json = await postJson("https://api.openai.com/v1/embeddings", { model: opts.model, input: texts }, {
            headers: { Authorization: `Bearer ${opts.apiKey}` },
            timeoutMs: opts.timeoutMs,
        });
        return json.data
            .sort((a, b) => a.index - b.index)
            .map((row) => {
            const embedding = normalizeEmbedding(new Float32Array(row.embedding));
            assertEmbeddingDim(embedding, opts.dim, `OpenAI ${opts.model}`);
            return embedding;
        });
    };
    return {
        provider: "openai",
        model: opts.model,
        dim: opts.dim,
        async embed(text) {
            const [embedding] = await embedRemote([text]);
            return embedding;
        },
        async embedBatch(texts) {
            return embedRemote(texts);
        },
    };
}
//# sourceMappingURL=openai.js.map