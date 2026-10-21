import type { MarkdownMemoryBackend } from "./backend.js";
import type { ResolvedMemory } from "./types.js";
export type CollectResolvedEntriesOpts = {
    backend: MarkdownMemoryBackend;
    agentDir: string;
    memoryFile: string;
    /** Include auto-*.md files not referenced by MEMORY.md overflow pointers. Default true. */
    includeOrphans?: boolean;
};
/** Read main MEMORY.md plus overflow / orphan auto files into a single entry list. */
export declare function collectResolvedEntries(opts: CollectResolvedEntriesOpts): Promise<ResolvedMemory>;
//# sourceMappingURL=resolveEntries.d.ts.map