import { readPiMemoryEnv } from "../../config/env.js";
import { isOllamaModelSpec, parseModelSpec } from "./modelSpec.js";
import { createOllamaLlmClient, ollamaHealthCheck } from "./ollama.js";
import { createOpenAICompatLlmClient, openaiCompatHealthCheck } from "./openai-compat.js";
import { tryCreatePiLlmClient } from "./pi-ai.js";
import { createStandaloneLlmClient } from "./standalone.js";
/** Best-effort LLM client for QueryIntent / consolidate. Returns null when unavailable. */
export async function createLlmClient(options = {}) {
    const env = options.env ?? readPiMemoryEnv();
    const modelSpec = options.modelSpec ?? env.helperModel;
    if (options.ctx) {
        const fromRegistry = await tryCreatePiLlmClient(options.ctx, modelSpec);
        if (fromRegistry)
            return fromRegistry;
    }
    if (env.openaiCompatBaseUrl && env.openaiCompatModel) {
        const ok = await openaiCompatHealthCheck(env.openaiCompatBaseUrl);
        if (ok) {
            return createOpenAICompatLlmClient({
                baseUrl: env.openaiCompatBaseUrl,
                model: env.openaiCompatModel,
                apiKey: env.openaiCompatApiKey,
                timeoutMs: env.httpTimeoutMs,
            });
        }
    }
    const ollamaModel = env.ollamaLlmModel ?? (isOllamaModelSpec(modelSpec) ? parseModelSpec(modelSpec).modelId : undefined);
    if (ollamaModel) {
        const ok = await ollamaHealthCheck(env.ollamaLlmBaseUrl);
        if (ok) {
            return createOllamaLlmClient({
                baseUrl: env.ollamaLlmBaseUrl,
                model: ollamaModel,
                timeoutMs: env.httpTimeoutMs,
            });
        }
    }
    if (env.helperApiKey && modelSpec && !isOllamaModelSpec(modelSpec)) {
        try {
            return createStandaloneLlmClient(modelSpec, { apiKey: env.helperApiKey });
        }
        catch {
            // fall through
        }
    }
    return null;
}
//# sourceMappingURL=factory.js.map