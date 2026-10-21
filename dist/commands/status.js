import { formatMemoryStatusLines, gatherMemoryStatus, } from "../status/index.js";
import { resolveMemoryAgentDir } from "../config/agentDir.js";
import { createMemoryStatusWidget } from "../ui/memoryStatusWidget.js";
import { parseMemoryStatusArgs } from "./parseMemoryStatusArgs.js";
let memoryStatusWidgetState = null;
export function resetMemoryStatusWidgetState() {
    memoryStatusWidgetState = null;
}
function renderMemoryStatusWidget(ctx, state) {
    ctx.ui.setWidget("pi-memory-status", (_tui, theme) => createMemoryStatusWidget(theme, state), {
        placement: "aboveEditor",
    });
}
function applyMemoryStatusAction(action, refreshed) {
    if (!memoryStatusWidgetState)
        return;
    if (action === "expand") {
        memoryStatusWidgetState.expanded = true;
        return;
    }
    if (action === "collapse") {
        memoryStatusWidgetState.expanded = false;
        return;
    }
    if (action === "toggle" && !refreshed) {
        memoryStatusWidgetState.expanded = !memoryStatusWidgetState.expanded;
        return;
    }
    if (action === "toggle" && refreshed) {
        memoryStatusWidgetState.expanded = false;
    }
}
export function createMemoryStatusCommand(deps) {
    return async (args, ctx) => {
        const action = parseMemoryStatusArgs(args);
        if (action === "hide") {
            memoryStatusWidgetState = null;
            if (ctx.hasUI) {
                ctx.ui.setWidget("pi-memory-status", undefined);
            }
            return;
        }
        const agentDir = deps.getAgentDir() ?? resolveMemoryAgentDir();
        const needsFetch = action === "refresh" || !memoryStatusWidgetState;
        if (needsFetch) {
            if (ctx.hasUI) {
                ctx.ui.setWorkingMessage("Checking memory…");
            }
            try {
                const report = await gatherMemoryStatus(agentDir);
                memoryStatusWidgetState = {
                    report,
                    expanded: memoryStatusWidgetState?.expanded ?? false,
                };
            }
            catch (error) {
                ctx.ui.notify(`Memory status failed: ${error instanceof Error ? error.message : String(error)}`, "warning");
                return;
            }
            finally {
                if (ctx.hasUI) {
                    ctx.ui.setWorkingMessage();
                }
            }
        }
        applyMemoryStatusAction(action, needsFetch);
        if (ctx.hasUI) {
            renderMemoryStatusWidget(ctx, memoryStatusWidgetState);
            return;
        }
        const lines = ["pi-memory status", ...formatMemoryStatusLines(memoryStatusWidgetState.report)];
        ctx.ui.notify(lines.join("\n"), "info");
    };
}
export function getMemoryStatusWidgetStateForTest() {
    return memoryStatusWidgetState;
}
export function setMemoryStatusWidgetStateForTest(state) {
    memoryStatusWidgetState = state;
}
//# sourceMappingURL=status.js.map