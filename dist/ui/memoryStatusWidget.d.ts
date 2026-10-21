import type { Theme } from "@earendil-works/pi-coding-agent";
import type { Component } from "@earendil-works/pi-tui";
import { type MemoryStatusReport } from "../status/index.js";
export type MemoryStatusWidgetState = {
    report: MemoryStatusReport;
    expanded: boolean;
};
export declare class MemoryStatusWidget implements Component {
    private readonly theme;
    private readonly state;
    constructor(theme: Theme, state: MemoryStatusWidgetState);
    invalidate(): void;
    render(width: number): string[];
}
export declare function createMemoryStatusWidget(theme: Theme, state: MemoryStatusWidgetState): MemoryStatusWidget;
//# sourceMappingURL=memoryStatusWidget.d.ts.map