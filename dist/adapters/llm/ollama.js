import { postJson } from "../http.js";
export async function ollamaHealthCheck(baseUrl) {
    try {
        const url = new URL("/api/tags", baseUrl);
        const res = await fetch(url, { signal: AbortSignal.timeout(3_000) });
        return res.ok;
    }
    catch {
        return false;
    }
}
export function createOllamaLlmClient(cfg) {
    const baseUrl = cfg.baseUrl.replace(/\/$/, "");
    const timeoutMs = cfg.timeoutMs ?? 60_000;
    return {
        async complete(prompt, signal) {
            const resp = await postJson(`${baseUrl}/api/chat`, {
                model: cfg.model,
                messages: [{ role: "user", content: prompt }],
                stream: false,
                options: { num_predict: 1024 },
            }, { timeoutMs, signal });
            if (resp.error)
                throw new Error(`Ollama: ${resp.error}`);
            const text = resp.message?.content?.trim();
            if (!text)
                throw new Error("Ollama: empty response");
            return text;
        },
    };
}
//# sourceMappingURL=ollama.js.map