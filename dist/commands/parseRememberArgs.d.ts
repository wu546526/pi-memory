import { type MemorySection } from "../store/types.js";
export type ParsedRememberArgs = {
    section: MemorySection;
    content: string;
} | {
    error: string;
};
/** Parse `/remember [section]? content`. Default section: Findings. */
export declare function parseRememberArgs(raw: string | string[]): ParsedRememberArgs;
//# sourceMappingURL=parseRememberArgs.d.ts.map