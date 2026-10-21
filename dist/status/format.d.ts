import type { Theme } from "@earendil-works/pi-coding-agent";
import type { MemoryStatusReport, StatusPalette } from "./types.js";
export declare function piStatusPalette(theme: Theme): StatusPalette;
export declare function formatMemoryStatusSummary(report: MemoryStatusReport, palette: StatusPalette, accent: (text: string) => string): string;
export declare function formatMemoryStatusLines(report: MemoryStatusReport, palette?: StatusPalette): string[];
export declare function formatMemoryStatusTuiLines(report: MemoryStatusReport, palette: StatusPalette, theme: Theme): string[];
export declare function printMemoryStatusRows(report: MemoryStatusReport, palette: StatusPalette, logLine: (label: string, value: string) => void): void;
//# sourceMappingURL=format.d.ts.map