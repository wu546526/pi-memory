import type { SidecarResponse } from "../protocol.js";
export type StatsContext = {
    dbPath: string;
};
export declare function handleStats(ctx: StatsContext): Extract<SidecarResponse, {
    type: "stats_ok";
}>;
//# sourceMappingURL=stats.d.ts.map