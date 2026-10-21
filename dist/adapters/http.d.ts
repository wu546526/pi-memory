export type PostJsonOptions = {
    headers?: Record<string, string>;
    timeoutMs?: number;
    signal?: AbortSignal;
};
export declare class HttpRequestError extends Error {
    readonly url: string;
    readonly status: number;
    readonly body: string;
    constructor(url: string, status: number, body: string);
}
export declare function postJson<T>(url: string, body: unknown, opts?: PostJsonOptions): Promise<T>;
//# sourceMappingURL=http.d.ts.map