import type { StatusPalette } from "../status/types.js";
export declare function paint(fn: (text: string) => string, text: string, stream?: NodeJS.WriteStream): string;
export declare const theme: {
    prefix: (stream?: NodeJS.WriteStream) => string;
    info: (text: string, stream?: NodeJS.WriteStream) => string;
    success: (text: string, stream?: NodeJS.WriteStream) => string;
    warn: (text: string, stream?: NodeJS.WriteStream) => string;
    error: (text: string, stream?: NodeJS.WriteStream) => string;
    dim: (text: string, stream?: NodeJS.WriteStream) => string;
    label: (text: string, stream?: NodeJS.WriteStream) => string;
    value: (text: string, stream?: NodeJS.WriteStream) => string;
    ok: (text: string, stream?: NodeJS.WriteStream) => string;
    bad: (text: string, stream?: NodeJS.WriteStream) => string;
};
export declare function cliStatusPalette(): StatusPalette;
//# sourceMappingURL=theme.d.ts.map