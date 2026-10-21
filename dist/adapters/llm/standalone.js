import { pickBy } from "es-toolkit";
import { complete, getEnvApiKey, getModels } from "@earendil-works/pi-ai/compat";
import { nowMs } from "../../utils/time.js";
import { extractTextFromResponse } from "./extractText.js";
import { parseModelSpec } from "./modelSpec.js";
function toProviderEnv(env) {
    return pickBy(env, (value) => value !== undefined);
}
export function createStandaloneLlmClient(modelSpec, options = {}) {
    const { provider, modelId } = parseModelSpec(modelSpec);
    const providerEnv = toProviderEnv(options.env ?? process.env);
    const model = getModels(provider).find((item) => item.id === modelId);
    if (!model) {
        throw new Error(`Model not found: ${provider}/${modelId}`);
    }
    const apiKey = options.apiKey ?? getEnvApiKey(provider, providerEnv);
    if (!apiKey) {
        throw new Error(`No API key for ${provider}`);
    }
    return {
        async complete(prompt, signal) {
            const response = await complete(model, {
                messages: [
                    {
                        role: "user",
                        content: [{ type: "text", text: prompt }],
                        timestamp: nowMs(),
                    },
                ],
            }, {
                apiKey,
                maxTokens: 1024,
                env: providerEnv,
                signal,
            });
            const text = extractTextFromResponse(response.content);
            if (!text.trim()) {
                throw new Error("LLM response was empty");
            }
            return text;
        },
    };
}
//# sourceMappingURL=standalone.js.map