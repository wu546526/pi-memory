import { DEFAULT_HELPER_MODEL, DEFAULT_HELPER_MODEL_SPEC, DEFAULT_HELPER_PROVIDER } from "../../constants/env.js";
export { DEFAULT_HELPER_MODEL, DEFAULT_HELPER_PROVIDER };
export type ModelSpec = {
    provider: string;
    modelId: string;
};
export declare function parseModelSpec(spec: string | undefined, defaultProvider?: string, defaultModelId?: string): ModelSpec;
export declare function isOllamaModelSpec(spec: string | undefined): boolean;
export { DEFAULT_HELPER_MODEL_SPEC };
//# sourceMappingURL=modelSpec.d.ts.map