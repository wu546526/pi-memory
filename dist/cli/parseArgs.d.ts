export type CliCommand = "consolidate" | "maintenance" | "drain-shutdown-queue" | "init" | "status" | "scheduler-sync" | "help";
export type CommonCliOptions = {
    agentDir?: string;
    verbose: boolean;
};
export type ConsolidateCliOptions = CommonCliOptions & {
    cron: boolean;
    force: boolean;
};
export type MaintenanceCliOptions = ConsolidateCliOptions;
export type DrainShutdownQueueCliOptions = CommonCliOptions;
export type StatusCliOptions = CommonCliOptions;
export type InitCliOptions = CommonCliOptions;
export type ParsedCli = {
    command: "help";
    error?: string;
} | {
    command: "consolidate";
    options: ConsolidateCliOptions;
} | {
    command: "maintenance";
    options: MaintenanceCliOptions;
} | {
    command: "drain-shutdown-queue";
    options: DrainShutdownQueueCliOptions;
} | {
    command: "init";
    options: InitCliOptions;
} | {
    command: "status";
    options: StatusCliOptions;
} | {
    command: "scheduler-sync";
    options: CommonCliOptions;
};
export declare function parseCliArgs(argv: string[]): ParsedCli;
export declare const CLI_HELP = "pi-memory \u2014 standalone tools for Pi local memory\n\nUsage:\n  pi-memory init [options]\n  pi-memory status [options]\n  pi-memory maintenance [options]\n  pi-memory consolidate [options]\n  pi-memory drain-shutdown-queue [options]\n  pi-memory scheduler sync [options]\n\nCommands:\n  init                    Create MEMORY.md from template when missing or empty\n  status                  Print MEMORY.md, sidecar, and vector index diagnostics\n  maintenance             Daily job: consolidate, then drain shutdown queue\n  consolidate             Run consolidate job (dedupe + optional reindex)\n  drain-shutdown-queue    Ingest durable facts from queued session shutdown metadata\n  scheduler sync          Install or refresh the OS maintenance scheduler (macOS launchd)\n\nOptions:\n  --agent-dir PATH        Memory data directory (overrides PI_MEMORY_AGENT_DIR)\n  --verbose, -v           Extra stderr output (TTY colors when supported)\n\nConsolidate / maintenance:\n  --cron                  Daily OS cron slot (passes cronFired to shouldConsolidate)\n  --force                 Run consolidate even when shouldConsolidate is false\n\nEnvironment:\n  PI_MEMORY_ENV_FILE        Explicit .env path\n  PI_MEMORY_AGENT_DIR       Memory data root; default ~/.pi/pi-memory-data\n  PI_MEMORY_DEBUG=1         Debug stderr logs (extension preflight + CLI)\n  PI_MEMORY_SKIP_SCHEDULER_SYNC=1  Skip automatic launchd install/update\n  NO_COLOR                  Disable chalk colors\n\nExamples:\n  pi-memory init\n  pi-memory status\n  pi-memory maintenance --cron --verbose\n  pi-memory consolidate --force --verbose\n  pi-memory drain-shutdown-queue --verbose\n";
//# sourceMappingURL=parseArgs.d.ts.map