import type { RedactTextResult } from "./types.js";
export type { RedactTextResult, RedactionSpan } from "./types.js";
/** Run all secret detectors, merge overlaps, return redacted text and debug metadata. */
export declare function redactText(text: string): RedactTextResult;
/**
 * True when nothing meaningful remains after redaction.
 * MemoryStore skips the write (fail-closed) instead of persisting a lone placeholder.
 */
export declare function isEmptyAfterRedaction(content: string): boolean;
//# sourceMappingURL=redactText.d.ts.map