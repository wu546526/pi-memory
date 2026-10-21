import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { LlmClient } from "../adapters/llm/types.js";
import type { MemoryStore } from "../store/memoryStore.js";
export type CompactHandlerDeps = {
    getMemoryStore(): MemoryStore | null;
    getLlmClient(): LlmClient | null;
    onCompactionIngested?(): Promise<void>;
};
export declare function registerCompactHandlers(pi: ExtensionAPI, deps: CompactHandlerDeps): void;
//# sourceMappingURL=register.d.ts.map