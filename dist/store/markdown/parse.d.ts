import { type MemorySection, type ParsedEntry } from "../types.js";
export declare function parseMemoryMarkdown(content: string, sourceFile: string): ParsedEntry[];
export declare function listOverflowPointers(content: string): string[];
export declare function isKnownSection(name: string): name is MemorySection;
//# sourceMappingURL=parse.d.ts.map