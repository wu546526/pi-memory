import { type LaunchdMaintenancePlistInput } from "./launchdPlist.js";
export declare function launchAgentPlistPath(label?: string): string;
/** True when the user LaunchAgent is registered in launchd (not merely when the plist file exists). */
export declare function isLaunchAgentLoaded(label: string): Promise<boolean>;
export type LaunchdSyncResult = {
    label: string;
    plistPath: string;
    /** Plist bytes changed on disk. */
    changed: boolean;
    /** launchctl bootstrap ran because the job was missing (e.g. prior bootstrap failed). */
    bootstrapped: boolean;
    removedLegacy: string[];
};
export declare function syncLaunchdMaintenanceJob(input: LaunchdMaintenancePlistInput): Promise<LaunchdSyncResult>;
//# sourceMappingURL=launchd.d.ts.map