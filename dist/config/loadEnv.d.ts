/**
 * Load pi-memory env into process.env (does not override existing vars).
 *
 * Search order:
 * 1. PI_MEMORY_ENV_FILE (explicit override)
 * 2. cwd `.env` / `.env.local` (project-local dev)
 * 3. ~/.pi/agent/pi-memory.env (recommended)
 */
export declare function loadEnv(cwd?: string): void;
//# sourceMappingURL=loadEnv.d.ts.map