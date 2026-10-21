import { LRUCache } from "lru-cache";
import { INTENT_CACHE_MAX_ENTRIES } from "../constants/preflight.js";
function normalizeInput(input) {
    return input.trim().replace(/\s+/g, " ").toLowerCase();
}
function cacheKey(sessionId, userInput) {
    return `${sessionId}\0${normalizeInput(userInput)}`;
}
class QueryIntentCache {
    lru = new LRUCache({ max: INTENT_CACHE_MAX_ENTRIES });
    get(sessionId, userInput) {
        if (!sessionId)
            return null;
        return this.lru.get(cacheKey(sessionId, userInput)) ?? null;
    }
    set(sessionId, userInput, intent) {
        if (!sessionId)
            return;
        this.lru.set(cacheKey(sessionId, userInput), intent);
    }
    clearSession(sessionId) {
        const prefix = `${sessionId}\0`;
        for (const key of this.lru.keys()) {
            if (key.startsWith(prefix))
                this.lru.delete(key);
        }
    }
    /** @internal test hook */
    resetForTests() {
        this.lru.clear();
    }
}
export const queryIntentCache = new QueryIntentCache();
export function resetQueryIntentCacheForTests() {
    queryIntentCache.resetForTests();
}
//# sourceMappingURL=intentCache.js.map