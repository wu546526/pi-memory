import { LAUNCHD_LABEL, SCHEDULER_TEMPLATE_FILES, SCHTASKS_TASK_NAME, } from "../constants/paths.js";
import { defaultMemoryAgentDir, defaultPiMemoryEnvFile, resolveConsolidateErrLogPath, resolveConsolidateLogPath, resolvePiLogsDir, } from "./paths.js";
import { getPlatform, isMacOS, isWindows } from "./platform.js";
/** Recommended OS scheduler for daily consolidate on this platform. */
export function getConsolidateSchedulerKind(platform = getPlatform()) {
    if (platform === "darwin")
        return "launchd";
    if (platform === "win32")
        return "schtasks";
    return "crontab";
}
export function defaultConsolidateSchedulerPaths(agentDir = defaultMemoryAgentDir()) {
    return {
        agentDir,
        envFile: defaultPiMemoryEnvFile(),
        logsDir: resolvePiLogsDir(agentDir),
        stdoutLog: resolveConsolidateLogPath(agentDir),
        stderrLog: resolveConsolidateErrLogPath(agentDir),
    };
}
/** argv for `pi-memory maintenance` (OS scheduler / wrapper scripts). */
export function buildMaintenanceCliArgs(opts) {
    const args = ["maintenance"];
    if (opts.cron)
        args.push("--cron");
    if (opts.verbose)
        args.push("--verbose");
    if (opts.agentDir)
        args.push("--agent-dir", opts.agentDir);
    return args;
}
/** @deprecated Prefer buildMaintenanceCliArgs for OS schedulers. */
export function buildConsolidateCliArgs(opts) {
    return buildMaintenanceCliArgs(opts);
}
/** Single-line shell command (macOS / Linux crontab). */
export function formatMaintenanceCronLine(opts) {
    const args = buildMaintenanceCliArgs(opts).join(" ");
    return [
        `PI_MEMORY_ENV_FILE=${opts.envFile}`,
        `PI_MEMORY_AGENT_DIR=${opts.agentDir}`,
        opts.nodePath,
        opts.cliPath,
        args,
        `>> ${opts.stdoutLog} 2>&1`,
    ].join(" ");
}
/** @deprecated Prefer formatMaintenanceCronLine. */
export function formatConsolidateCronLine(opts) {
    return formatMaintenanceCronLine(opts);
}
/** Template file basename shipped under templates/ for this platform. */
export function getConsolidateTemplateNames(platform = getPlatform()) {
    if (platform === "darwin") {
        return [SCHEDULER_TEMPLATE_FILES.launchd, SCHEDULER_TEMPLATE_FILES.crontab];
    }
    if (platform === "win32") {
        return [SCHEDULER_TEMPLATE_FILES.windowsCmd, SCHEDULER_TEMPLATE_FILES.windowsSchtasks];
    }
    return [SCHEDULER_TEMPLATE_FILES.crontab];
}
export { LAUNCHD_LABEL, SCHEDULER_TEMPLATE_FILES, SCHTASKS_TASK_NAME, isMacOS, isWindows };
//# sourceMappingURL=scheduler.js.map