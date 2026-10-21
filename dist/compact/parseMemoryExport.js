import { parseMemoryMarkdown } from "../store/markdown/parse.js";
import { entryDedupeKey } from "../utils/memory/index.js";
import { MEMORY_SECTIONS } from "../store/types.js";
const MEMORY_EXPORT_HEADER_RE = /^##\s+Memory Export\s*$/im;
function extractMemoryExportBlock(summary) {
    const match = MEMORY_EXPORT_HEADER_RE.exec(summary);
    if (!match)
        return "";
    let body = summary.slice(match.index + match[0].length);
    const nextTopLevel = body.search(/^##\s+(?!#)/m);
    if (nextTopLevel >= 0) {
        body = body.slice(0, nextTopLevel);
    }
    return body.trim();
}
/** Normalize ### Section headers to ## for shared markdown parser. */
function normalizeExportMarkdown(exportBody) {
    const lines = exportBody.split("\n");
    const normalized = [];
    for (const line of lines) {
        const subsection = line.match(/^###\s+(Preferences|Conventions|Findings|Todos)\s*$/);
        if (subsection) {
            normalized.push(`## ${subsection[1]}`);
            continue;
        }
        normalized.push(line);
    }
    return normalized.join("\n");
}
function parseExportBullets(exportBody) {
    const normalized = normalizeExportMarkdown(exportBody);
    if (!normalized.trim())
        return [];
    const parsed = parseMemoryMarkdown(normalized, "memory-export");
    return parsed.map((entry) => ({
        id: "",
        section: entry.section,
        content: entry.content,
        timestamp: "",
    }));
}
/** Parse durable facts from the ## Memory Export section of a dual-purpose summary. */
export function parseMemoryExport(summary) {
    const exportBody = extractMemoryExportBlock(summary);
    if (!exportBody)
        return [];
    const entries = parseExportBullets(exportBody);
    const seen = new Set();
    return entries.filter((entry) => {
        const key = entryDedupeKey(entry);
        if (seen.has(key))
            return false;
        seen.add(key);
        return entry.content.trim().length > 0;
    });
}
export function hasMemoryExportSection(summary) {
    return MEMORY_EXPORT_HEADER_RE.test(summary);
}
export function isKnownExportSection(name) {
    return MEMORY_SECTIONS.includes(name);
}
//# sourceMappingURL=parseMemoryExport.js.map