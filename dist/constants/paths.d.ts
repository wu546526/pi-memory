/** Default memory data root under ~/.pi/ (MEMORY.md, sidecar, vector DB). */
export declare const PI_MEMORY_DATA_SUBDIR = "pi-memory-data";
/** pi-memory config file under ~/.pi/agent/ (not a generic dotenv at ~/.pi root). */
export declare const PI_MEMORY_ENV_FILE_NAME = "pi-memory.env";
export declare const PI_LOGS_SUBDIR = "logs";
/** Sidecar IPC + index files (under agent dir). */
export declare const SIDECAR_SOCKET_FILE = "memory.sock";
export declare const SIDECAR_DB_FILE = "memory.vec.sqlite";
export declare const SIDECAR_PID_SUFFIX = ".pid";
export declare const SIDECAR_SPAWN_LOCK_FILE = "sidecar.spawn.lock";
/** Consolidate / maintenance scheduler log basenames (under `<agentDir>/logs`). */
export declare const CONSOLIDATE_LOG_FILE = "maintenance.log";
export declare const CONSOLIDATE_ERR_LOG_FILE = "maintenance.err.log";
/** OS scheduler identifiers. */
export declare const LAUNCHD_LABEL = "com.pi.memory.maintenance";
/** Pre-0.3.x / dev labels removed during scheduler sync. */
export declare const LEGACY_LAUNCHD_LABELS: readonly ["dev.pi.memory-consolidate", "com.pi.memory.consolidate"];
export declare const SCHTASKS_TASK_NAME = "PiMemoryMaintenance";
export declare const SCHEDULER_TEMPLATE_FILES: {
    readonly launchd: "com.pi.memory.consolidate.plist.example";
    readonly crontab: "crontab.example";
    readonly windowsCmd: "consolidate.cmd.example";
    readonly windowsSchtasks: "schtasks.example.txt";
};
//# sourceMappingURL=paths.d.ts.map