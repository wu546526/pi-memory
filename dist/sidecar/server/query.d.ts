import type { SidecarResponse } from "../protocol.js";
export type QueryContext = {
    dbPath: string;
};
export declare function handleQuery(requestId: string, queryText: string, ctx: QueryContext): Promise<Extract<SidecarResponse, {
    type: "result";
}>>;
//# sourceMappingURL=query.d.ts.map