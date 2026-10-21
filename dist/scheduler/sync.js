import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ENV_KEYS } from "../constants/env.js";
import { LAUNCHD_LABEL } from "../constants/paths.js";
import { resolveMemoryAgentDir } from "../config/agentDir.js";
import { debugMemory } from "../utils/debugLog.js";
import { isMacOS } from "../utils/platform.js";
import { defaultConsolidateSchedulerPaths } from "../utils/scheduler.js";
import { syncLaunchdMaintenanceJob } from "./launchd.js";
export function isSchedulerSyncDisabled(env = process.env) {
    const value = env[ENV_KEYS.SKIP_SCHEDULER_SYNC];
    return value === "1" || value === "true";
}
/** Whether this process can attempt a user LaunchAgent sync (macOS + uid + home). */
export function canSyncLaunchdInProcess(env = process.env) {
    if (!isMacOS())
        return { ok: false, reason: "unsupported-platform" };
    if (process.getuid?.() === undefined)
        return { ok: false, reason: "no-user-id" };
    if (!homedir()?.trim())
        return { ok: false, reason: "no-home-directory" };
    if (isSchedulerSyncDisabled(env))
        return { ok: false, reason: "PI_MEMORY_SKIP_SCHEDULER_SYNC" };
    return { ok: true };
}
export function resolvePackageCliPath(moduleUrl = import.meta.url) {
    return join(dirname(fileURLToPath(moduleUrl)), "..", "cli.js");
}
function formatSyncError(error) {
    return error instanceof Error ? error.message : String(error);
}
/**
 * Install or refresh the OS maintenance scheduler (macOS launchd today).
 * Never throws — automatic callers (postinstall, session_start, init) treat failures as best-effort.
 */
export async function syncMaintenanceScheduler(opts = {}) {
    const env = opts.env ?? process.env;
    const capability = canSyncLaunchdInProcess(env);
    if (!capability.ok) {
        return { status: "skipped", reason: capability.reason };
    }
    try {
        const agentDir = opts.agentDir ?? resolveMemoryAgentDir({ env });
        const paths = defaultConsolidateSchedulerPaths(agentDir);
        const nodePath = opts.nodePath ?? process.execPath;
        const cliPath = opts.cliPath ?? resolvePackageCliPath(import.meta.url);
        const result = await syncLaunchdMaintenanceJob({
            label: LAUNCHD_LABEL,
            nodePath,
            cliPath,
            envFile: paths.envFile,
            agentDir: paths.agentDir,
            logsDir: paths.logsDir,
            stdoutLog: paths.stdoutLog,
            stderrLog: paths.stderrLog,
        });
        debugMemory("scheduler", "launchd sync complete", {
            label: result.label,
            changed: result.changed,
            bootstrapped: result.bootstrapped,
            removedLegacy: result.removedLegacy.join(",") || "none",
        }, env);
        return {
            status: "synced",
            platform: "launchd",
            label: result.label,
            plistPath: result.plistPath,
            changed: result.changed,
            bootstrapped: result.bootstrapped,
            removedLegacy: result.removedLegacy,
        };
    }
    catch (error) {
        const message = formatSyncError(error);
        debugMemory("scheduler", "launchd sync failed (best-effort)", { message }, env);
        return { status: "failed", reason: "launchd-sync-error", message };
    }
}
//# sourceMappingURL=sync.js.map