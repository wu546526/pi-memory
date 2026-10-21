import { DEFAULT_HELPER_MODEL, DEFAULT_HELPER_MODEL_SPEC, DEFAULT_HELPER_PROVIDER, } from "../../constants/env.js";
export { DEFAULT_HELPER_MODEL, DEFAULT_HELPER_PROVIDER };
export function parseModelSpec(spec, defaultProvider = DEFAULT_HELPER_PROVIDER, defaultModelId = DEFAULT_HELPER_MODEL) {
    if (!spec?.trim()) {
        return { provider: defaultProvider, modelId: defaultModelId };
    }
    const trimmed = spec.trim();
    const slash = trimmed.indexOf("/");
    if (slash === -1) {
        return { provider: defaultProvider, modelId: trimmed };
    }
    return {
        provider: trimmed.slice(0, slash),
        modelId: trimmed.slice(slash + 1),
    };
}
export function isOllamaModelSpec(spec) {
    return !!spec?.trim().startsWith("ollama/");
}
export { DEFAULT_HELPER_MODEL_SPEC };
//# sourceMappingURL=modelSpec.js.map