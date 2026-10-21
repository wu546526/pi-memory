import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import { type MemoryStatusWidgetState } from "../ui/memoryStatusWidget.js";
export type MemoryStatusCommandDeps = {
    getAgentDir(): string | null;
};
export declare function resetMemoryStatusWidgetState(): void;
export declare function createMemoryStatusCommand(deps: MemoryStatusCommandDeps): (args: string | string[], ctx: ExtensionCommandContext) => Promise<void>;
export declare function getMemoryStatusWidgetStateForTest(): MemoryStatusWidgetState | null;
export declare function setMemoryStatusWidgetStateForTest(state: MemoryStatusWidgetState | null): void;
//# sourceMappingURL=status.d.ts.map