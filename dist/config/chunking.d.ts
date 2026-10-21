export type ChunkingConfig = {
    /** Max chars per chunk body; <=0 keeps one chunk per entry. */
    maxChars: number;
};
export declare function readChunkingConfig(env?: NodeJS.ProcessEnv): ChunkingConfig;
export { CHUNKING_DISABLED_MAX_CHARS, DEFAULT_CHUNK_MAX_CHARS, } from "../constants/chunking.js";
//# sourceMappingURL=chunking.d.ts.map