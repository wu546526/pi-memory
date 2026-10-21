import type { QueryIntent } from "./queryIntent.js";
declare class QueryIntentCache {
    private readonly lru;
    get(sessionId: string | undefined, userInput: string): QueryIntent | null;
    set(sessionId: string | undefined, userInput: string, intent: QueryIntent): void;
    clearSession(sessionId: string): void;
    /** @internal test hook */
    resetForTests(): void;
}
export declare const queryIntentCache: QueryIntentCache;
export declare function resetQueryIntentCacheForTests(): void;
export {};
//# sourceMappingURL=intentCache.d.ts.map