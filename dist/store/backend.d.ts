export declare class MarkdownMemoryBackend {
    private readonly memoryFile;
    constructor(memoryFile: string);
    ensureAgentDir(): Promise<void>;
    readText(path: string): Promise<string>;
    writeText(path: string, content: string): Promise<void>;
    listAutoFiles(agentDir: string): Promise<string[]>;
    autoFilePath(agentDir: string, fileName: string): string;
    deleteAutoFile(path: string): Promise<void>;
    withMemoryLock<T>(fn: () => Promise<T>): Promise<T>;
}
//# sourceMappingURL=backend.d.ts.map