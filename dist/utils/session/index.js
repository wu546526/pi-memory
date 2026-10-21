export function readParentSession(header) {
    const parent = header?.parentSession ?? header?.parent_session;
    return typeof parent === "string" && parent.trim().length > 0 ? parent.trim() : undefined;
}
export function isSubagentSession(ctx) {
    const header = ctx.sessionManager.getHeader();
    return readParentSession(header) !== undefined;
}
//# sourceMappingURL=index.js.map