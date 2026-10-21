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
import { cryptoPatterns } from "./crypto.js";
import { genericPatterns } from "./generic.js";
import { llmPatterns } from "./llm.js";
import { platformPatterns } from "./platform.js";
/** Order matters for overlap debug ids only; mergeSpans handles cross-rule overlaps regardless. */
export const SECRET_PATTERNS = [
    ...cryptoPatterns,
    ...platformPatterns,
    ...llmPatterns,
    ...genericPatterns,
];
//# sourceMappingURL=index.js.map