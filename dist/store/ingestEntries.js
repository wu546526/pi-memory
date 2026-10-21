import { parseMemoryExport } from "../compact/parseMemoryExport.js";
import { filterCompactionDelta, shouldSkipSubagentCompactionIngest, } from "../compact/subagentDelta.js";
/** Parse Memory Export from summary text and append new facts to Ground Truth. */
export async function ingestMemoryExport(opts) {
    const parsed = parseMemoryExport(opts.summary);
    if (parsed.length === 0) {
        return { appended: 0 };
    }
    let entries = parsed;
    if (opts.isSubagent) {
        const existing = await opts.store.listEntries();
        entries = filterCompactionDelta(parsed, existing);
        if (shouldSkipSubagentCompactionIngest(parsed, entries)) {
            return { appended: 0 };
        }
    }
    if (entries.length === 0) {
        return { appended: 0 };
    }
    const appended = await opts.store.appendMany(entries, { mode: "ifAbsent" });
    return { appended };
}
//# sourceMappingURL=ingestEntries.js.map