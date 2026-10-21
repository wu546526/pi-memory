export function injectPrivateMemoryContext(scaffolded, userPayload, privateContext) {
    const ctx = privateContext.trim();
    if (!ctx)
        return scaffolded;
    if (userPayload && scaffolded.endsWith(userPayload)) {
        return (scaffolded.slice(0, scaffolded.length - userPayload.length) +
            ctx +
            "\n\n" +
            userPayload);
    }
    return `${scaffolded}\n\n${ctx}`;
}
//# sourceMappingURL=strip.js.map