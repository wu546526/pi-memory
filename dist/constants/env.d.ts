export type EmbedderProvider = "hash" | "openai" | "ollama";
/** process.env keys (PI_MEMORY_*). */
export declare const ENV_KEYS: {
    readonly EMBEDDER: "PI_MEMORY_EMBEDDER";
    readonly EMBED_DIM: "PI_MEMORY_EMBED_DIM";
    readonly OPENAI_API_KEY: "PI_MEMORY_OPENAI_API_KEY";
    readonly OPENAI_EMBED_MODEL: "PI_MEMORY_OPENAI_EMBED_MODEL";
    readonly OLLAMA_BASE_URL: "PI_MEMORY_OLLAMA_BASE_URL";
    readonly OLLAMA_EMBED_MODEL: "PI_MEMORY_OLLAMA_EMBED_MODEL";
    readonly OLLAMA_LLM_BASE_URL: "PI_MEMORY_OLLAMA_LLM_BASE_URL";
    readonly OLLAMA_LLM_MODEL: "PI_MEMORY_OLLAMA_LLM_MODEL";
    readonly HELPER_MODEL: "PI_MEMORY_HELPER_MODEL";
    readonly HELPER_API_KEY: "PI_MEMORY_HELPER_API_KEY";
    readonly OPENAI_COMPAT_BASE_URL: "PI_MEMORY_OPENAI_COMPAT_BASE_URL";
    readonly OPENAI_COMPAT_MODEL: "PI_MEMORY_OPENAI_COMPAT_MODEL";
    readonly OPENAI_COMPAT_API_KEY: "PI_MEMORY_OPENAI_COMPAT_API_KEY";
    readonly HTTP_TIMEOUT_MS: "PI_MEMORY_HTTP_TIMEOUT_MS";
    readonly PREFLIGHT_BUDGET_MS: "PI_MEMORY_PREFLIGHT_BUDGET_MS";
    /** @deprecated Use PI_MEMORY_PREFLIGHT_BUDGET_MS */
    readonly PREFLIGHT_TIMEOUT_MS: "PI_MEMORY_PREFLIGHT_TIMEOUT_MS";
    readonly REINDEX_DEBOUNCE_MS: "PI_MEMORY_REINDEX_DEBOUNCE_MS";
    readonly CONSOLIDATE_DEBOUNCE_MS: "PI_MEMORY_CONSOLIDATE_DEBOUNCE_MS";
    readonly TOP_K: "PI_MEMORY_TOP_K";
    readonly MMR_LAMBDA: "PI_MEMORY_MMR_LAMBDA";
    readonly MIN_RELEVANCE: "PI_MEMORY_MIN_RELEVANCE";
    readonly CHUNK_MAX_CHARS: "PI_MEMORY_CHUNK_MAX_CHARS";
    readonly INTENT_RETRIES: "PI_MEMORY_INTENT_RETRIES";
    readonly WARM_SIDECAR: "PI_MEMORY_WARM_SIDECAR";
    readonly INTENT_CACHE: "PI_MEMORY_INTENT_CACHE";
    readonly AGENT_DIR: "PI_MEMORY_AGENT_DIR";
    readonly ENV_FILE: "PI_MEMORY_ENV_FILE";
    readonly DEBUG: "PI_MEMORY_DEBUG";
    readonly SKIP_SCHEDULER_SYNC: "PI_MEMORY_SKIP_SCHEDULER_SYNC";
};
/** Fallback OPENAI_API_KEY when PI_MEMORY_OPENAI_API_KEY unset. */
export declare const FALLBACK_OPENAI_API_KEY_ENV = "OPENAI_API_KEY";
export declare const DEFAULT_EMBEDDER: EmbedderProvider;
export declare const DEFAULT_OPENAI_EMBED_MODEL = "text-embedding-3-small";
export declare const DEFAULT_OLLAMA_BASE_URL = "http://127.0.0.1:11434";
export declare const DEFAULT_OLLAMA_EMBED_MODEL = "nomic-embed-text";
export declare const DEFAULT_HELPER_PROVIDER = "deepseek";
export declare const DEFAULT_HELPER_MODEL = "deepseek-v4-flash";
export declare const DEFAULT_HELPER_MODEL_SPEC = "deepseek/deepseek-v4-flash";
export declare const DEFAULT_EMBED_DIM_FALLBACK = 1536;
/** Known embedding dimensions; override with PI_MEMORY_EMBED_DIM if needed. */
export declare const KNOWN_EMBED_DIMS: Record<string, number>;
export declare const DEFAULT_HASH_EMBED_DIM = 768;
//# sourceMappingURL=env.d.ts.map