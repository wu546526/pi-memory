/**
 * Curated secret detectors adapted from TruffleHog v3 pkg/detectors.
 * @see https://github.com/trufflesecurity/trufflehog/tree/main/pkg/detectors
 *
 * Go `\w` → JS `\w`; block patterns use `[\s\S]` instead of Go's `[\s\S]`.
 * Sources noted per rule for audit / rotation.
 */
export { REDACTED_PLACEHOLDER, REDACTION_POLICY_VERSION, SECRET_POLICY_VERSION, } from "./constants.js";
export { cryptoPatterns } from "./crypto.js";
export { genericPatterns } from "./generic.js";
export { llmPatterns } from "./llm.js";
export { platformPatterns } from "./platform.js";
export type { SecretMatchSpan, SecretPattern, SecretPatternMatcher } from "./types.js";
import type { SecretPattern } from "./types.js";
/** Order matters for overlap debug ids only; mergeSpans handles cross-rule overlaps regardless. */
export declare const SECRET_PATTERNS: readonly SecretPattern[];
//# sourceMappingURL=index.d.ts.map