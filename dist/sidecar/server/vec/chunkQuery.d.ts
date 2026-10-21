import type { MemoryEntry } from "../../protocol.js";
type VecDatabase = import("better-sqlite3").Database;
export declare function queryChunks(db: VecDatabase, queryText: string, topK?: number): Promise<MemoryEntry[]>;
export {};
//# sourceMappingURL=chunkQuery.d.ts.map