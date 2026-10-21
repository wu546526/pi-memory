export type InitMemoryWorkspaceResult = {
    agentDir: string;
    memoryFile: string;
    created: boolean;
    skipped: boolean;
    reason?: "already_initialized";
};
/**
 * Ensure the memory data directory exists, `logs/` is present, and MEMORY.md follows the canonical template.
 * Never overwrites a non-empty MEMORY.md.
 */
export declare function initializeMemoryWorkspace(agentDir: string): Promise<InitMemoryWorkspaceResult>;
/** Read bundled template from templates/MEMORY.md.example (postinstall / docs). */
export declare function readMemoryTemplateExample(packageRoot: string): Promise<string>;
//# sourceMappingURL=initWorkspace.d.ts.map