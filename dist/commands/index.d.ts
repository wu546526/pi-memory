import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { CommandDeps } from "./types.js";
export type { CommandDeps, MemoryStatusCommandDeps, RememberCommandDeps } from "./types.js";
export { parseRememberArgs } from "./parseRememberArgs.js";
export declare function registerCommands(pi: ExtensionAPI, deps: CommandDeps): void;
//# sourceMappingURL=index.d.ts.map