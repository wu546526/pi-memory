export function formatEntryLine(entry) {
    const prefix = entry.userAuthored ? "[user] " : "";
    const meta = `<!-- id:${entry.id}${entry.userAuthored ? " user" : ""} ts:${entry.timestamp} -->`;
    return `- ${prefix}${entry.content.trim()} ${meta}`;
}
export function formatSectionHeader(section) {
    return `## ${section}`;
}
export function countLines(content) {
    if (!content)
        return 0;
    return content.split("\n").length;
}
//# sourceMappingURL=format.js.map