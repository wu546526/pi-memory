import { truncateToWidth } from "@earendil-works/pi-tui";
import { MEMORY_STATUS_COLLAPSE_HINT, MEMORY_STATUS_EXPAND_HINT, formatMemoryStatusSummary, formatMemoryStatusTuiLines, piStatusPalette, } from "../status/index.js";
function formatHeader(theme, width) {
    const title = theme.fg("accent", theme.bold("pi-memory status"));
    const fill = Math.max(0, width - title.length - 2);
    const left = Math.floor(fill / 2);
    const right = fill - left;
    return `${theme.fg("borderMuted", "─".repeat(left))} ${title} ${theme.fg("borderMuted", "─".repeat(right))}`;
}
export class MemoryStatusWidget {
    theme;
    state;
    constructor(theme, state) {
        this.theme = theme;
        this.state = state;
    }
    invalidate() { }
    render(width) {
        const palette = piStatusPalette(this.theme);
        const lines = [];
        if (!this.state.expanded) {
            const summary = formatMemoryStatusSummary(this.state.report, palette, (text) => this.theme.fg("accent", text));
            const hint = this.theme.fg("dim", MEMORY_STATUS_EXPAND_HINT);
            lines.push(truncateToWidth(`${summary}${hint}`, width));
        }
        else {
            lines.push(truncateToWidth(formatHeader(this.theme, width), width));
            for (const line of formatMemoryStatusTuiLines(this.state.report, palette, this.theme)) {
                lines.push(truncateToWidth(`  ${line}`, width));
            }
            lines.push(truncateToWidth(this.theme.fg("dim", MEMORY_STATUS_COLLAPSE_HINT), width));
        }
        return lines;
    }
}
export function createMemoryStatusWidget(theme, state) {
    return new MemoryStatusWidget(theme, state);
}
//# sourceMappingURL=memoryStatusWidget.js.map