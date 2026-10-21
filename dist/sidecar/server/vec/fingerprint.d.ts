import type { IndexDocument } from "../../protocol.js";
import type { Embedder } from "../../../adapters/embed/types.js";
import { getLastReindexFingerprint, setLastReindexFingerprint } from "./schema.js";
/**
 * Content fingerprint of a document set: sha256 over sorted (id, content) pairs
 * plus the embedder identity. Any change to ids, contents, or the embedder
 * (model/provider/dim) produces a different fingerprint, so a match means the
 * stored chunks + embeddings already reflect exactly this input.
 */
export declare function computeDocumentsFingerprint(documents: IndexDocument[], embedder: Embedder): string;
export { getLastReindexFingerprint, setLastReindexFingerprint };
//# sourceMappingURL=fingerprint.d.ts.map