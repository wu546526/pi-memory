import type { EmbedderProvider } from "../constants/env.js";
export type PiMemoryEnv = {
    embedder: EmbedderProvider;
    openaiApiKey?: string;
    openaiEmbedModel: string;
    ollamaBaseUrl: string;
    ollamaEmbedModel: string;
    ollamaLlmBaseUrl: string;
    ollamaLlmModel?: string;
    helperModel: string;
    helperApiKey?: string;
    openaiCompatBaseUrl?: string;
    openaiCompatModel?: string;
    openaiCompatApiKey?: string;
    embedDimOverride?: number;
    httpTimeoutMs: number;
    preflightBudgetMs: number;
    reindexDebounceMs: number;
    consolidateDebounceMs: number;
    agentDir?: string;
    envFile?: string;
};
/** Read pi-memory env from process.env (after optional loadEnv). */
export declare function readPiMemoryEnv(env?: NodeJS.ProcessEnv): PiMemoryEnv;
export declare function resolveEmbedDim(model: string, override?: number): number;
export type { EmbedderProvider } from "../constants/env.js";
export { KNOWN_EMBED_DIMS, DEFAULT_HASH_EMBED_DIM } from "../constants/env.js";
//# sourceMappingURL=env.d.ts.map