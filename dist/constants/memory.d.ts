export declare const DEFAULT_MEMORY_FILE = "MEMORY.md";
export declare const MEMORY_GC_FILE = ".memory_gc";
export declare const COMPACTION_STATE_FILE = ".memory_compactions.json";
export declare const SHUTDOWN_QUEUE_FILE = ".memory_shutdown_queue.jsonl";
export declare const SHUTDOWN_PROCESSED_FILE = ".memory_shutdown_processed.json";
export declare const AUTO_FILE_PREFIX = "auto-";
export declare const OVERFLOW_POINTER_RE: RegExp;
export declare const MEMORY_SECTIONS: readonly ["Preferences", "Conventions", "Findings", "Todos"];
export type MemorySection = (typeof MEMORY_SECTIONS)[number];
/** MEMORY.md line cap before spilling to auto-*.md. */
export declare const DEFAULT_MAX_LINES = 150;
/** Max chars for MEMORY.md fallback injection in preflight. */
export declare const DEFAULT_FALLBACK_MAX_CHARS = 8000;
/** Consolidate triggers (OR). */
export declare const CONSOLIDATE_OVERFLOW_FILE_THRESHOLD = 12;
export declare const CONSOLIDATE_GC_INTERVAL_DAYS = 7;
//# sourceMappingURL=memory.d.ts.map