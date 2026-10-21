import { LRUCache } from "lru-cache";
import { QUERY_CACHE_MAX_ENTRIES } from "../constants/timing.js";
function normalizeQuery(query) {
    return query.trim().replace(/\s+/g, " ").toLowerCase();
}
function cacheKey(agentDir, query) {
    return `${agentDir}\0${normalizeQuery(query)}`;
}
class SidecarQueryCache {
    generationByAgent = new Map();
    lru = new LRUCache({ max: QUERY_CACHE_MAX_ENTRIES });
    getGeneration(agentDir) {
        return this.generationByAgent.get(agentDir) ?? 0;
    }
    get(agentDir, query) {
        const hit = this.lru.get(cacheKey(agentDir, query));
        if (!hit)
            return null;
        if (hit.indexGeneration !== this.getGeneration(agentDir))
            return null;
        return hit.results;
    }
    set(agentDir, query, results) {
        this.lru.set(cacheKey(agentDir, query), {
            results,
            indexGeneration: this.getGeneration(agentDir),
        });
    }
    onReindexComplete(agentDir, indexGeneration) {
        this.generationByAgent.set(agentDir, indexGeneration);
        for (const key of this.lru.keys()) {
            if (key.startsWith(`${agentDir}\0`))
                this.lru.delete(key);
        }
    }
    /** @internal test hook */
    resetForTests() {
        this.generationByAgent.clear();
        this.lru.clear();
    }
}
export const sidecarQueryCache = new SidecarQueryCache();
export function resetSidecarQueryCacheForTests() {
    sidecarQueryCache.resetForTests();
}
//# sourceMappingURL=queryCache.js.map