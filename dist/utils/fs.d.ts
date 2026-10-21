/** Cross-platform path join (`\` on Windows, `/` on POSIX). */
export declare function joinPath(...segments: string[]): string;
export declare function pathBasename(filePath: string): string;
export declare function pathDirname(filePath: string): string;
export declare function pathExists(filePath: string): boolean;
/** True when the current process can read the path. */
export declare function canRead(filePath: string): boolean;
export declare function isENOENT(error: unknown): boolean;
/** Create directory tree; Unix applies secure mode, Windows omits mode. */
export declare function ensureDir(dirPath: string): Promise<void>;
export declare function ensureDirSync(dirPath: string): void;
/** Read UTF-8 text; missing file → empty string. */
export declare function readText(filePath: string): Promise<string>;
/** Read UTF-8 text; propagates ENOENT. */
export declare function readTextRequired(filePath: string): Promise<string>;
/** Write UTF-8 text; creates parent directories. */
export declare function writeText(filePath: string, content: string): Promise<void>;
/** Append UTF-8 text; creates parent directories. */
export declare function appendText(filePath: string, content: string): Promise<void>;
/** List directory entries; missing dir → empty array. */
export declare function listDir(dirPath: string): Promise<string[]>;
/** Delete file; missing file → no-op. */
export declare function removeFile(filePath: string): Promise<void>;
/** Ensure file exists (empty) for lockfile targets. */
export declare function ensureFile(filePath: string): Promise<void>;
//# sourceMappingURL=fs.d.ts.map