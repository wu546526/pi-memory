import { LAUNCHD_LABEL, SCHEDULER_TEMPLATE_FILES, SCHTASKS_TASK_NAME } from "../constants/paths.js";
import { isMacOS, isWindows, type PiMemoryPlatform } from "./platform.js";
export type ConsolidateSchedulerKind = "launchd" | "crontab" | "schtasks";
/** Recommended OS scheduler for daily consolidate on this platform. */
export declare function getConsolidateSchedulerKind(platform?: PiMemoryPlatform): ConsolidateSchedulerKind;
export type ConsolidateSchedulerPaths = {
    agentDir: string;
    envFile: string;
    logsDir: string;
    stdoutLog: string;
    stderrLog: string;
};
export declare function defaultConsolidateSchedulerPaths(agentDir?: string): ConsolidateSchedulerPaths;
export type ConsolidateCliInvocation = {
    nodePath: string;
    cliPath: string;
    cron: boolean;
    verbose: boolean;
    agentDir?: string;
};
/** argv for `pi-memory maintenance` (OS scheduler / wrapper scripts). */
export declare function buildMaintenanceCliArgs(opts: Pick<ConsolidateCliInvocation, "cron" | "verbose" | "agentDir">): string[];
/** @deprecated Prefer buildMaintenanceCliArgs for OS schedulers. */
export declare function buildConsolidateCliArgs(opts: Pick<ConsolidateCliInvocation, "cron" | "verbose" | "agentDir">): string[];
/** Single-line shell command (macOS / Linux crontab). */
export declare function formatMaintenanceCronLine(opts: ConsolidateCliInvocation & ConsolidateSchedulerPaths): string;
/** @deprecated Prefer formatMaintenanceCronLine. */
export declare function formatConsolidateCronLine(opts: ConsolidateCliInvocation & ConsolidateSchedulerPaths): string;
export type ConsolidateTemplateName = (typeof SCHEDULER_TEMPLATE_FILES)[keyof typeof SCHEDULER_TEMPLATE_FILES];
/** Template file basename shipped under templates/ for this platform. */
export declare function getConsolidateTemplateNames(platform?: PiMemoryPlatform): ConsolidateTemplateName[];
export { LAUNCHD_LABEL, SCHEDULER_TEMPLATE_FILES, SCHTASKS_TASK_NAME, isMacOS, isWindows };
//# sourceMappingURL=scheduler.d.ts.map