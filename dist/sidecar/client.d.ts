import { type IndexDocument, type IndexStats, type SidecarResponse } from "./protocol.js";
export type SidecarRequestOptions = {
    timeoutMs?: number;
    signal?: AbortSignal;
};
export declare function sidecarRequest<T extends SidecarResponse>(socketPath: string, frame: Record<string, unknown>, options?: SidecarRequestOptions): Promise<T>;
export declare function ping(socketPath: string): Promise<boolean>;
export declare function fetchIndexStats(socketPath: string): Promise<{
    stats: IndexStats;
} | {
    error: string;
}>;
export declare function query(socketPath: string, queryText: string, options?: SidecarRequestOptions): Promise<{
    type: "result";
    request_id: string;
    results: import("./protocol.js").MemoryEntry[];
}>;
export type ReindexResult = Extract<SidecarResponse, {
    type: "reindex_ok";
}>;
export declare function reindex(socketPath: string, documents?: IndexDocument[]): Promise<ReindexResult>;
//# sourceMappingURL=client.d.ts.map