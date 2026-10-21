import { cliStatusPalette } from "./theme.js";
import { printMemoryStatusRows } from "../status/format.js";
import { gatherMemoryStatus } from "../status/gather.js";
export { gatherMemoryStatus } from "../status/gather.js";
export { formatMemoryStatusLines, formatMemoryStatusSummary, formatMemoryStatusTuiLines, piStatusPalette, } from "../status/format.js";
export function printMemoryStatus(report, log) {
    printMemoryStatusRows(report, cliStatusPalette(), (label, value) => log.line(label, value));
}
export async function runStatusCommand(agentDir, log) {
    const report = await gatherMemoryStatus(agentDir);
    printMemoryStatus(report, log);
    return 0;
}
//# sourceMappingURL=status.js.map