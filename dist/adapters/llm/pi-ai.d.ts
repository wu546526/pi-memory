import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { LlmClient } from "./types.js";
export declare function tryCreatePiLlmClient(ctx: ExtensionContext, modelSpec?: string): Promise<LlmClient | null>;
export declare function createPiLlmClient(ctx: ExtensionContext, modelSpec?: string): LlmClient;
//# sourceMappingURL=pi-ai.d.ts.map