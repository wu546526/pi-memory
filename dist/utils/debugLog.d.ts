export declare function isMemoryDebugEnabled(env?: NodeJS.ProcessEnv): boolean;
/** Debug-only stderr log; never shown to Pi UI or session. */
export declare function debugMemory(scope: string, message: string, fields?: Record<string, string | number | boolean | null | undefined>, env?: NodeJS.ProcessEnv): void;
//# sourceMappingURL=debugLog.d.ts.map