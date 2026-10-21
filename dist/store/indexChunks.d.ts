import type { IndexDocument } from "../sidecar/protocol.js";
import type { ChunkingConfig } from "../config/chunking.js";
import type { ParsedEntry } from "./types.js";
/**
 * Split long text on paragraph / line / sentence boundaries, then hard-wrap at maxChars.
 */
export declare function splitTextByMaxChars(text: string, maxChars: number): string[];
export declare function buildIndexDocuments(entries: ParsedEntry[], chunking: ChunkingConfig): IndexDocument[];
//# sourceMappingURL=indexChunks.d.ts.map