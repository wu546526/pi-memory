export type LaunchdMaintenancePlistInput = {
    label: string;
    nodePath: string;
    cliPath: string;
    envFile: string;
    agentDir: string;
    stdoutLog: string;
    stderrLog: string;
    logsDir: string;
};
/** Escape a string for safe inclusion inside single-quoted sh(1) arguments. */
export declare function shellSingleQuote(value: string): string;
export declare function buildLaunchdMaintenanceShellCommand(input: LaunchdMaintenancePlistInput): string;
export declare function buildLaunchdMaintenancePlist(input: LaunchdMaintenancePlistInput): string;
//# sourceMappingURL=launchdPlist.d.ts.map