import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { MemoryStore } from "../store/memoryStore.js";
export type RememberCommandDeps = {
    getMemoryStore(): MemoryStore | null;
    onRemembered?(): Promise<void>;
};
export declare function createRememberCommand(deps: RememberCommandDeps): (args: string | string[], ctx: ExtensionCommandContext) => Promise<void>;
//# sourceMappingURL=remember.d.ts.map