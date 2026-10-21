import type { MemoryEntry } from "./protocol.js";
declare class SidecarQueryCache {
    private readonly generationByAgent;
    private readonly lru;
    getGeneration(agentDir: string): number;
    get(agentDir: string, query: string): MemoryEntry[] | null;
    set(agentDir: string, query: string, results: MemoryEntry[]): void;
    onReindexComplete(agentDir: string, indexGeneration: number): void;
    /** @internal test hook */
    resetForTests(): void;
}
export declare const sidecarQueryCache: SidecarQueryCache;
export declare function resetSidecarQueryCacheForTests(): void;
export {};
//# sourceMappingURL=queryCache.d.ts.map