import { type ConfigType, type Dayjs } from "dayjs";
export type TimeInput = ConfigType;
/** Current local time. */
export declare function now(): Dayjs;
/** Unix epoch ms (deadlines, lock files, external APIs). */
export declare function nowMs(): number;
/** Parse stored or external input; invalid values fall back to epoch. */
export declare function parseTime(input: TimeInput): Dayjs;
/**
 * Local timestamp for MEMORY entries, GC markers, shutdown queue.
 * Format: YYYY-MM-DDTHH:mm:ss.SSS (local wall clock, no Z suffix).
 */
export declare function formatTimestamp(input?: TimeInput): string;
/** Local calendar date (e.g. auto-YYYY-MM-DD-*.md). */
export declare function formatLocalDate(input?: TimeInput): string;
/** Fallback timestamp when entry metadata is missing. */
export declare function epochTimestamp(): string;
/** Whole calendar days from `from` until `to` (local; default `to` = now). */
export declare function daysSince(from: TimeInput, to?: TimeInput): number;
/** Milliseconds left until `deadlineMs` (default clock: now). */
export declare function remainingMs(deadlineMs: number, atMs?: number): number;
//# sourceMappingURL=time.d.ts.map