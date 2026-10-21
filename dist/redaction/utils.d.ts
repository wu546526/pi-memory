/**
 * Redaction pipeline helpers.
 *
 * Flow: hasKeyword (gate) → runPatternMatch (per rule) → collectSpans → mergeSpans → applySpans
 */
import type { SecretMatchSpan, SecretPattern, SecretPatternMatcher } from "./patterns/types.js";
import type { RedactionSpan } from "./types.js";
/** Gap between two ranges; 0 when overlapping or adjacent. Used by proximity matchers. */
export declare function distanceBetweenRanges(aStart: number, aEnd: number, bStart: number, bEnd: number): number;
/**
 * TruffleHog-style keyword gate: skip expensive regex / pairing when no keyword appears.
 * Empty keywords → always run (used by rules with strong standalone prefixes).
 */
export declare function hasKeyword(text: string, keywords: readonly string[] | undefined): boolean;
/**
 * Execute one rule's `match` field: either a custom fn or a global RegExp scan.
 * Prefers capture group 1 when present so only the secret token is redacted, not surrounding syntax.
 */
export declare function runPatternMatch(text: string, matcher: SecretPatternMatcher): SecretMatchSpan[];
/** Run every pattern that passes keyword gate; attach rule id to each raw span. */
export declare function collectSpans(text: string, patterns: readonly SecretPattern[]): RedactionSpan[];
/**
 * Collapse overlapping / adjacent hits into one span so we emit a single [REDACTED].
 * Example: `Bearer ghp_xxx` matched by both bearer-token and github-token → one placeholder.
 */
export declare function mergeSpans(spans: RedactionSpan[]): RedactionSpan[];
/** Replace matched ranges right-to-left so earlier span indices stay valid while slicing. */
export declare function applySpans(text: string, spans: RedactionSpan[], placeholder: string): string;
//# sourceMappingURL=utils.d.ts.map