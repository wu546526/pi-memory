import { type MemorySection, type StoreMemoryEntry } from "../store/types.js";
/** Parse durable facts from the ## Memory Export section of a dual-purpose summary. */
export declare function parseMemoryExport(summary: string): StoreMemoryEntry[];
export declare function hasMemoryExportSection(summary: string): boolean;
export declare function isKnownExportSection(name: string): name is MemorySection;
//# sourceMappingURL=parseMemoryExport.d.ts.map