/**
 * Path A redaction entry: scan text against SECRET_PATTERNS, replace hits with [REDACTED].
 * Called from MemoryStore.prepareEntryForWrite before Ground Truth is persisted.
 */
import { REDACTED_PLACEHOLDER, SECRET_PATTERNS, SECRET_POLICY_VERSION, } from "./patterns/index.js";
import { applySpans, collectSpans, mergeSpans } from "./utils.js";
/** Run all secret detectors, merge overlaps, return redacted text and debug metadata. */
export function redactText(text) {
    const spans = mergeSpans(collectSpans(text, SECRET_PATTERNS));
    const hitCount = spans.length;
    return {
        text: applySpans(text, spans, REDACTED_PLACEHOLDER),
        hitCount,
        secretHits: hitCount,
        piiHits: 0,
        mutated: hitCount > 0,
        spans,
        policyVersion: SECRET_POLICY_VERSION,
    };
}
/**
 * True when nothing meaningful remains after redaction.
 * MemoryStore skips the write (fail-closed) instead of persisting a lone placeholder.
 */
export function isEmptyAfterRedaction(content) {
    const trimmed = content.trim();
    if (trimmed.length === 0) {
        return true;
    }
    return trimmed === REDACTED_PLACEHOLDER;
}
//# sourceMappingURL=redactText.js.map