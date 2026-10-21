import { CHUNKING_DISABLED_MAX_CHARS } from "../constants/chunking.js";
import { pathBasename } from "../utils/fs.js";
function formatChunkContent(section, body) {
    return `[${section}] ${body.trim()}`;
}
/**
 * Split long text on paragraph / line / sentence boundaries, then hard-wrap at maxChars.
 */
export function splitTextByMaxChars(text, maxChars) {
    const trimmed = text.trim();
    if (!trimmed)
        return [];
    if (maxChars <= 0 || trimmed.length <= maxChars)
        return [trimmed];
    const parts = [];
    let remaining = trimmed;
    while (remaining.length > maxChars) {
        let cut = maxChars;
        const minCut = Math.floor(maxChars * 0.35);
        const paragraph = remaining.lastIndexOf("\n\n", cut);
        if (paragraph >= minCut) {
            cut = paragraph;
        }
        else {
            const line = remaining.lastIndexOf("\n", cut);
            if (line >= minCut) {
                cut = line;
            }
            else {
                const sentence = remaining.lastIndexOf(". ", cut);
                if (sentence >= minCut) {
                    cut = sentence + 1;
                }
                else {
                    const space = remaining.lastIndexOf(" ", cut);
                    if (space >= minCut) {
                        cut = space;
                    }
                }
            }
        }
        const part = remaining.slice(0, cut).trim();
        if (part)
            parts.push(part);
        remaining = remaining.slice(cut).trim();
        if (!part && remaining.length > 0) {
            parts.push(remaining.slice(0, maxChars).trim());
            remaining = remaining.slice(maxChars).trim();
        }
    }
    if (remaining)
        parts.push(remaining);
    return parts.length > 0 ? parts : [trimmed];
}
export function buildIndexDocuments(entries, chunking) {
    const docs = [];
    const maxChars = chunking.maxChars <= CHUNKING_DISABLED_MAX_CHARS
        ? CHUNKING_DISABLED_MAX_CHARS
        : chunking.maxChars;
    for (const entry of entries) {
        const bodies = maxChars <= CHUNKING_DISABLED_MAX_CHARS
            ? [entry.content.trim()].filter(Boolean)
            : splitTextByMaxChars(entry.content, maxChars);
        if (bodies.length === 0)
            continue;
        bodies.forEach((body, index) => {
            const id = bodies.length === 1 ? entry.id : `${entry.id}#${index}`;
            docs.push({
                id,
                content: formatChunkContent(entry.section, body),
                source: pathBasename(entry.sourceFile),
                timestamp: entry.timestamp,
            });
        });
    }
    return docs;
}
//# sourceMappingURL=indexChunks.js.map