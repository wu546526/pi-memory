import type { ParsedEntry, StoreMemoryEntry } from "./types.js";
export type MemoryStoreForIngest = {
    listEntries(): Promise<ParsedEntry[]>;
    appendMany(entries: StoreMemoryEntry[], opts?: {
        mode?: "ifAbsent";
    }): Promise<number>;
};
export type IngestMemoryExportResult = {
    appended: number;
};
/** Parse Memory Export from summary text and append new facts to Ground Truth. */
export declare function ingestMemoryExport(opts: {
    store: MemoryStoreForIngest;
    summary: string;
    isSubagent: boolean;
}): Promise<IngestMemoryExportResult>;
//# sourceMappingURL=ingestEntries.d.ts.map