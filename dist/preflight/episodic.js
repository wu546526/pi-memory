import { readPreflightRuntimeConfig } from "../config/preflight.js";
import { resolvePreflightBudget } from "../config/preflightBudget.js";
import { preflightAbortSignal, PREFLIGHT_TIMEOUT_MESSAGE } from "../utils/async.js";
import { debugMemory } from "../utils/debugLog.js";
import { nowMs, remainingMs } from "../utils/time.js";
import { query } from "../sidecar/client.js";
import { buildRetrievalQuery, extractQueryIntent, shouldRunEpisodicPreflight, } from "./queryIntent.js";
import { sidecarQueryCache } from "../sidecar/queryCache.js";
import { renderFallbackPrivateMemory, renderSidecarPrivateMemory, } from "./render.js";
/**
 * Fail-silent episodic preflight: QueryIntent (optional) → buildRetrievalQuery → sidecar.query → fallback.
 */
export async function runEpisodicPreflight(userInput, options) {
    const startedAt = nowMs();
    const forceEpisodic = options.forceEpisodic ?? options.force ?? false;
    const runtime = readPreflightRuntimeConfig();
    try {
        if (await options.store.isEmpty()) {
            debugMemory("preflight", "skipped", { reason: "empty" });
            return null;
        }
        if (!shouldRunEpisodicPreflight(userInput, forceEpisodic)) {
            debugMemory("preflight", "skipped", { reason: "gate" });
            return null;
        }
        options.onProgress?.("Searching memory...");
        const budget = resolvePreflightBudget(options.budgetMs);
        const deadline = nowMs() + budget.totalMs;
        const intentStartedAt = nowMs();
        const intentBudget = Math.min(budget.intentMs, remainingMs(deadline));
        let intent;
        let intentSkipped = false;
        let intentCacheHit = false;
        try {
            const intentSignal = preflightAbortSignal(intentBudget, options.signal);
            const extracted = await extractQueryIntent(userInput, options.llm ?? null, {
                forceIntent: options.forceIntent,
                signal: intentSignal,
                sessionId: options.sessionId,
                intentCache: runtime.intentCache,
            });
            intent = extracted.intent;
            intentSkipped = extracted.skipped;
            intentCacheHit = extracted.cacheHit;
        }
        catch {
            intent = { raw_query: userInput.trim() };
        }
        const intentMs = nowMs() - intentStartedAt;
        const retrievalQuery = buildRetrievalQuery(intent, userInput);
        const cached = sidecarQueryCache.get(options.agentDir, retrievalQuery);
        let privateContext = "";
        let cacheHit = false;
        let sidecarMs = 0;
        let resultCount = 0;
        let usedFallback = false;
        if (cached) {
            cacheHit = true;
            resultCount = cached.length;
            privateContext = renderSidecarPrivateMemory(retrievalQuery, cached);
        }
        else {
            const sidecarStartedAt = nowMs();
            const queryBudget = Math.min(budget.sidecarMs, remainingMs(deadline));
            try {
                if (queryBudget <= 0 || options.signal?.aborted) {
                    throw new Error(PREFLIGHT_TIMEOUT_MESSAGE);
                }
                const result = await query(options.socketPath, retrievalQuery, {
                    timeoutMs: queryBudget,
                    signal: options.signal,
                });
                sidecarMs = nowMs() - sidecarStartedAt;
                resultCount = result.results.length;
                sidecarQueryCache.set(options.agentDir, retrievalQuery, result.results);
                privateContext = renderSidecarPrivateMemory(retrievalQuery, result.results);
            }
            catch {
                sidecarMs = nowMs() - sidecarStartedAt;
                // sidecar unavailable or timed out → fallback
            }
        }
        if (!privateContext.trim()) {
            usedFallback = true;
            const fallback = await options.store.readForFallback();
            privateContext = renderFallbackPrivateMemory(fallback);
            resultCount = fallback.trim() ? 1 : 0;
        }
        debugMemory("preflight", "recall", {
            intent_ms: intentMs,
            intent_skipped: intentSkipped,
            intent_cache_hit: intentCacheHit,
            sidecar_ms: sidecarMs,
            total_ms: nowMs() - startedAt,
            cache_hit: cacheHit,
            fallback: usedFallback,
            results: resultCount,
        });
        if (!privateContext.trim())
            return null;
        return { privateContext, usedFallback };
    }
    catch {
        debugMemory("preflight", "failed", { total_ms: nowMs() - startedAt });
        return null;
    }
}
//# sourceMappingURL=episodic.js.map