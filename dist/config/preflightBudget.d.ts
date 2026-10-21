export type PreflightBudget = {
    totalMs: number;
    intentMs: number;
    sidecarMs: number;
};
/** Split shared preflight deadline between QueryIntent LLM and sidecar query. */
export declare function resolvePreflightBudget(totalMs?: number): PreflightBudget;
export { DEFAULT_PREFLIGHT_BUDGET_MS } from "../constants/timing.js";
//# sourceMappingURL=preflightBudget.d.ts.map