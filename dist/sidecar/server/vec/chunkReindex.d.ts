import type { IndexDocument } from "../../protocol.js";
import { type ReindexOutcome } from "./schema.js";
type VecDatabase = import("better-sqlite3").Database;
export declare function reindexChunks(db: VecDatabase, documents: IndexDocument[]): Promise<ReindexOutcome>;
export {};
//# sourceMappingURL=chunkReindex.d.ts.map