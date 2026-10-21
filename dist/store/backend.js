import lockfile from "proper-lockfile";
import { MEMORY_LOCK_MAX_TIMEOUT_MS, MEMORY_LOCK_MIN_TIMEOUT_MS, MEMORY_LOCK_RETRIES, } from "../constants/timing.js";
import { ensureDir, ensureFile, joinPath, listDir, pathDirname, readText, removeFile, writeText, } from "../utils/fs.js";
import { isAutoOverflowFile } from "./paths.js";
export class MarkdownMemoryBackend {
    memoryFile;
    constructor(memoryFile) {
        this.memoryFile = memoryFile;
    }
    async ensureAgentDir() {
        await ensureDir(pathDirname(this.memoryFile));
    }
    async readText(path) {
        return readText(path);
    }
    async writeText(path, content) {
        await writeText(path, content);
    }
    async listAutoFiles(agentDir) {
        const names = await listDir(agentDir);
        return names.filter(isAutoOverflowFile).sort();
    }
    autoFilePath(agentDir, fileName) {
        return joinPath(agentDir, fileName);
    }
    async deleteAutoFile(path) {
        await removeFile(path);
    }
    async withMemoryLock(fn) {
        await this.ensureAgentDir();
        await ensureFile(this.memoryFile);
        const release = await lockfile.lock(this.memoryFile, {
            retries: {
                retries: MEMORY_LOCK_RETRIES,
                minTimeout: MEMORY_LOCK_MIN_TIMEOUT_MS,
                maxTimeout: MEMORY_LOCK_MAX_TIMEOUT_MS,
            },
        });
        try {
            return await fn();
        }
        finally {
            await release();
        }
    }
}
//# sourceMappingURL=backend.js.map