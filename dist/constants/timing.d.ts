export declare const MS_PER_DAY: number;
/** HTTP / LLM adapters. */
export declare const DEFAULT_HTTP_TIMEOUT_MS = 30000;
export declare const DEFAULT_LLM_COMPAT_TIMEOUT_MS = 120000;
/** Preflight episodic retrieval (shared deadline for intent + sidecar). */
export declare const DEFAULT_PREFLIGHT_BUDGET_MS = 800;
export declare const MIN_PREFLIGHT_BUDGET_MS = 250;
export declare const MAX_PREFLIGHT_BUDGET_MS = 1500;
/** Minimum time reserved for sidecar embed + scan after intent extraction. */
export declare const MIN_PREFLIGHT_SIDECAR_RESERVE_MS = 200;
/** @deprecated Use DEFAULT_PREFLIGHT_BUDGET_MS */
export declare const DEFAULT_PREFLIGHT_TIMEOUT_MS = 800;
/** Sidecar query cache (extension process). */
export declare const QUERY_CACHE_MAX_ENTRIES = 500;
/** Debounced sidecar reindex after MEMORY writes. */
export declare const DEFAULT_REINDEX_DEBOUNCE_MS = 500;
/** Debounced consolidate check after MEMORY writes. */
export declare const DEFAULT_CONSOLIDATE_DEBOUNCE_MS = 2000;
/** Session-alive periodic shouldConsolidate tick (7-day catch-up). */
export declare const DEFAULT_CONSOLIDATE_CHECK_INTERVAL_MS: number;
/** OS scheduler daily consolidate slot. */
export declare const CONSOLIDATE_CRON_HOUR = 3;
export declare const CONSOLIDATE_CRON_MINUTE = 0;
/** Sidecar process lifecycle. */
export declare const SIDECAR_START_TIMEOUT_MS = 5000;
export declare const SIDECAR_SPAWN_LOCK_STALE_MS = 10000;
export declare const SIDECAR_FORCE_KILL_DELAY_MS = 5000;
/** Sidecar client RPC timeouts. */
export declare const SIDECAR_PING_TIMEOUT_MS = 1000;
export declare const SIDECAR_QUERY_TIMEOUT_MS = 3000;
export declare const SIDECAR_REINDEX_TIMEOUT_MS = 10000;
/** Warm start dummy query (session_start; not counted against Preflight budget). */
export declare const SIDECAR_WARMUP_QUERY_TIMEOUT_MS = 500;
/** proper-lockfile on MEMORY.md. */
export declare const MEMORY_LOCK_RETRIES = 5;
export declare const MEMORY_LOCK_MIN_TIMEOUT_MS = 100;
export declare const MEMORY_LOCK_MAX_TIMEOUT_MS = 500;
//# sourceMappingURL=timing.d.ts.map