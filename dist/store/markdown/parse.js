import { pathBasename } from "../../utils/fs.js";
import { epochTimestamp } from "../../utils/time.js";
import { OVERFLOW_POINTER_RE } from "../../constants/memory.js";
import { MEMORY_SECTIONS } from "../types.js";
const SECTION_RE = /^##\s+(Preferences|Conventions|Findings|Todos)\s*$/;
const ENTRY_META_RE = /<!--\s*id:([^\s]+)(?:\s+user)?(?:\s+ts:([^\s]+))?\s*-->/;
const USER_PREFIX_RE = /^\[user\]\s+/;
export function parseMemoryMarkdown(content, sourceFile) {
    const entries = [];
    let section;
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const sectionMatch = line.match(SECTION_RE);
        if (sectionMatch) {
            section = sectionMatch[1];
            continue;
        }
        if (!line.startsWith("- ") || !section)
            continue;
        const pointerMatch = line.match(OVERFLOW_POINTER_RE);
        if (pointerMatch)
            continue;
        const metaMatch = line.match(ENTRY_META_RE);
        const id = metaMatch?.[1] ?? `${pathBasename(sourceFile)}:${i + 1}`;
        const timestamp = metaMatch?.[2] ?? epochTimestamp();
        let body = line.slice(2).replace(ENTRY_META_RE, "").trim();
        const userAuthored = USER_PREFIX_RE.test(body);
        if (userAuthored)
            body = body.replace(USER_PREFIX_RE, "").trim();
        if (!body)
            continue;
        entries.push({
            id,
            section,
            content: body,
            userAuthored: userAuthored || undefined,
            timestamp,
            sourceFile,
            line: i + 1,
        });
    }
    return entries;
}
export function listOverflowPointers(content) {
    const files = [];
    for (const line of content.split("\n")) {
        const match = line.match(OVERFLOW_POINTER_RE);
        if (match?.[1])
            files.push(match[1]);
    }
    return files;
}
export function isKnownSection(name) {
    return MEMORY_SECTIONS.includes(name);
}
//# sourceMappingURL=parse.js.map