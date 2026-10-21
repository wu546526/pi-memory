import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { type PiMemoryEnv } from "../../config/env.js";
import type { LlmClient } from "./types.js";
export type CreateLlmClientOptions = {
    ctx?: ExtensionContext;
    modelSpec?: string;
    env?: PiMemoryEnv;
};
/** Best-effort LLM client for QueryIntent / consolidate. Returns null when unavailable. */
export declare function createLlmClient(options?: CreateLlmClientOptions): Promise<LlmClient | null>;
//# sourceMappingURL=factory.d.ts.map