import { getVecStore } from "./vec/store.js";
export async function handleQuery(requestId, queryText, ctx) {
    const store = getVecStore(ctx.dbPath);
    const results = await store.query(queryText);
    return { type: "result", request_id: requestId, results };
}
//# sourceMappingURL=query.js.map