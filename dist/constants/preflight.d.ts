/** Injected private memory block size cap. */
export declare const PRIVATE_MEMORY_BODY_BYTE_CAP: number;
export declare const PRIVATE_MEMORY_TAG = "private_memory";
export declare const PRIVATE_MEMORY_OPEN = "<private_memory>";
export declare const PRIVATE_MEMORY_CLOSE = "</private_memory>";
/** Regex gate: skip episodic preflight for short generic prompts. */
export declare const MEMORY_CUE_RE: RegExp;
export declare const PREFLIGHT_SKIP_MIN_LENGTH = 12;
export declare const PREFLIGHT_EXTRACT_MIN_LENGTH = 24;
/** Helper LLM retries after the first attempt (0 = single try). */
export declare const DEFAULT_INTENT_RETRIES = 0;
export declare const MAX_INTENT_RETRIES = 3;
/** Sidecar warm start + intent LRU defaults. */
export declare const DEFAULT_WARM_SIDECAR_ENABLED = true;
export declare const DEFAULT_INTENT_CACHE_ENABLED = true;
export declare const INTENT_CACHE_MAX_ENTRIES = 128;
//# sourceMappingURL=preflight.d.ts.map