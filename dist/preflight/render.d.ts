import { PRIVATE_MEMORY_BODY_BYTE_CAP } from "../constants/preflight.js";
import type { MemoryEntry } from "../sidecar/protocol.js";
export { PRIVATE_MEMORY_BODY_BYTE_CAP };
export declare function sanitizeUserBlock(body: string): string;
export declare function truncatePrivateMemoryBody(body: string, cap?: number): string;
export declare function renderSidecarPrivateMemory(query: string, results: MemoryEntry[]): string;
export declare function renderFallbackPrivateMemory(fallbackText: string): string;
export declare function renderMemoryCapPrivateMemory(memoryCap: string): string;
export declare function mergePrivateMemoryBlocks(...blocks: Array<string | null | undefined>): string;
//# sourceMappingURL=render.d.ts.map