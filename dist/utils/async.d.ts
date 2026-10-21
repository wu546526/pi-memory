export declare const PREFLIGHT_ABORTED_MESSAGE = "aborted";
export declare const PREFLIGHT_TIMEOUT_MESSAGE = "preflight timeout";
/** Throw when `signal` is already aborted (matches legacy preflight fail-fast). */
export declare function throwIfAborted(signal?: AbortSignal, message?: string): void;
/**
 * Merge a budget timeout with an optional caller `AbortSignal`.
 * Uses Node built-ins: AbortSignal.timeout + AbortSignal.any.
 */
export declare function mergeAbortSignals(timeoutMs: number, userSignal?: AbortSignal): AbortSignal;
/** Preflight budget + extension cancel. Alias for {@link mergeAbortSignals}. */
export declare function preflightAbortSignal(budgetMs: number, userSignal?: AbortSignal): AbortSignal;
//# sourceMappingURL=async.d.ts.map