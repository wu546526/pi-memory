export type SchedulerSyncResult = {
    status: "skipped";
    reason: string;
} | {
    status: "synced";
    platform: "launchd";
    label: string;
    plistPath: string;
    changed: boolean;
    bootstrapped: boolean;
    removedLegacy: string[];
} | {
    status: "failed";
    reason: string;
    message: string;
};
export declare function isSchedulerSyncDisabled(env?: NodeJS.ProcessEnv): boolean;
/** Whether this process can attempt a user LaunchAgent sync (macOS + uid + home). */
export declare function canSyncLaunchdInProcess(env?: NodeJS.ProcessEnv): {
    ok: true;
} | {
    ok: false;
    reason: string;
};
export declare function resolvePackageCliPath(moduleUrl?: string): string;
export type SyncMaintenanceSchedulerOptions = {
    agentDir?: string;
    cliPath?: string;
    nodePath?: string;
    env?: NodeJS.ProcessEnv;
};
/**
 * Install or refresh the OS maintenance scheduler (macOS launchd today).
 * Never throws — automatic callers (postinstall, session_start, init) treat failures as best-effort.
 */
export declare function syncMaintenanceScheduler(opts?: SyncMaintenanceSchedulerOptions): Promise<SchedulerSyncResult>;
//# sourceMappingURL=sync.d.ts.map