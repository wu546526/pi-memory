import { createRememberCommand } from "./remember.js";
import { createMemoryStatusCommand } from "./status.js";
export { parseRememberArgs } from "./parseRememberArgs.js";
export function registerCommands(pi, deps) {
    pi.registerCommand("remember", {
        description: "Append a user-authored note to MEMORY.md",
        handler: createRememberCommand(deps),
    });
    pi.registerCommand("memory-status", {
        description: "Show MEMORY.md, sidecar, and vector index diagnostics (toggle expand/collapse; hide to dismiss)",
        handler: createMemoryStatusCommand(deps),
    });
}
//# sourceMappingURL=index.js.map