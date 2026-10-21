import dayjs from "dayjs";
/** Current local time. */
export function now() {
    return dayjs();
}
/** Unix epoch ms (deadlines, lock files, external APIs). */
export function nowMs() {
    return dayjs().valueOf();
}
/** Parse stored or external input; invalid values fall back to epoch. */
export function parseTime(input) {
    const parsed = dayjs(input);
    return parsed.isValid() ? parsed : dayjs(0);
}
/**
 * Local timestamp for MEMORY entries, GC markers, shutdown queue.
 * Format: YYYY-MM-DDTHH:mm:ss.SSS (local wall clock, no Z suffix).
 */
export function formatTimestamp(input) {
    const t = input === undefined ? dayjs() : parseTime(input);
    return t.format("YYYY-MM-DDTHH:mm:ss.SSS");
}
/** Local calendar date (e.g. auto-YYYY-MM-DD-*.md). */
export function formatLocalDate(input) {
    const t = input === undefined ? dayjs() : parseTime(input);
    return t.format("YYYY-MM-DD");
}
/** Fallback timestamp when entry metadata is missing. */
export function epochTimestamp() {
    return formatTimestamp(0);
}
/** Whole calendar days from `from` until `to` (local; default `to` = now). */
export function daysSince(from, to) {
    const end = to === undefined ? dayjs() : parseTime(to);
    const start = parseTime(from);
    return end.startOf("day").diff(start.startOf("day"), "day");
}
/** Milliseconds left until `deadlineMs` (default clock: now). */
export function remainingMs(deadlineMs, atMs = nowMs()) {
    return Math.max(0, deadlineMs - atMs);
}
//# sourceMappingURL=time.js.map