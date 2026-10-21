import type { IndexDocument, SidecarResponse } from "../protocol.js";
export type ReindexContext = {
    dbPath: string;
};
export declare function handleReindex(requestId: string, ctx: ReindexContext, documents?: IndexDocument[]): Promise<Extract<SidecarResponse, {
    type: "reindex_ok";
}>>;
//# sourceMappingURL=reindex.d.ts.map