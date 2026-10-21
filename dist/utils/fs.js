/** Runtime fs helpers. Pre-build postinstall mirror: scripts/platform-fs.mjs */
import { accessSync, existsSync, mkdirSync, constants } from "node:fs";
import { appendFile, mkdir, readFile, readdir, unlink, writeFile, } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { expandHomePath, mkdirOptions } from "./paths.js";
/** Cross-platform path join (`\` on Windows, `/` on POSIX). */
export function joinPath(...segments) {
    return join(...segments);
}
export function pathBasename(filePath) {
    return basename(filePath);
}
export function pathDirname(filePath) {
    return dirname(filePath);
}
export function pathExists(filePath) {
    return existsSync(expandHomePath(filePath));
}
/** True when the current process can read the path. */
export function canRead(filePath) {
    try {
        accessSync(expandHomePath(filePath), constants.R_OK);
        return true;
    }
    catch {
        return false;
    }
}
export function isENOENT(error) {
    return error?.code === "ENOENT";
}
/** Create directory tree; Unix applies secure mode, Windows omits mode. */
export async function ensureDir(dirPath) {
    await mkdir(expandHomePath(dirPath), mkdirOptions());
}
export function ensureDirSync(dirPath) {
    mkdirSync(expandHomePath(dirPath), mkdirOptions());
}
/** Read UTF-8 text; missing file → empty string. */
export async function readText(filePath) {
    try {
        return await readFile(expandHomePath(filePath), "utf8");
    }
    catch (error) {
        if (isENOENT(error))
            return "";
        throw error;
    }
}
/** Read UTF-8 text; propagates ENOENT. */
export async function readTextRequired(filePath) {
    return readFile(expandHomePath(filePath), "utf8");
}
/** Write UTF-8 text; creates parent directories. */
export async function writeText(filePath, content) {
    const resolved = expandHomePath(filePath);
    await ensureDir(dirname(resolved));
    await writeFile(resolved, content, "utf8");
}
/** Append UTF-8 text; creates parent directories. */
export async function appendText(filePath, content) {
    const resolved = expandHomePath(filePath);
    await ensureDir(dirname(resolved));
    await appendFile(resolved, content, "utf8");
}
/** List directory entries; missing dir → empty array. */
export async function listDir(dirPath) {
    try {
        return await readdir(expandHomePath(dirPath));
    }
    catch (error) {
        if (isENOENT(error))
            return [];
        throw error;
    }
}
/** Delete file; missing file → no-op. */
export async function removeFile(filePath) {
    try {
        await unlink(expandHomePath(filePath));
    }
    catch (error) {
        if (isENOENT(error))
            return;
        throw error;
    }
}
/** Ensure file exists (empty) for lockfile targets. */
export async function ensureFile(filePath) {
    try {
        await readTextRequired(filePath);
    }
    catch (error) {
        if (isENOENT(error)) {
            await writeText(filePath, "");
            return;
        }
        throw error;
    }
}
//# sourceMappingURL=fs.js.map