/** Incremental JSONL (one JSON object per line) framing for UDS IPC and queue files. */
export declare class JsonlFramer {
    private buffer;
    push(chunk: string): string[];
    reset(): void;
}
export declare function serializeJsonlFrame(value: unknown): string;
export declare function parseJsonlLine<T>(line: string): T;
//# sourceMappingURL=jsonl.d.ts.map