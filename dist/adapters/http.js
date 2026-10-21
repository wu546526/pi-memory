export class HttpRequestError extends Error {
    url;
    status;
    body;
    constructor(url, status, body) {
        super(`${url} failed (${status}): ${body}`);
        this.url = url;
        this.status = status;
        this.body = body;
        this.name = "HttpRequestError";
    }
}
export async function postJson(url, body, opts = {}) {
    const timeoutMs = opts.timeoutMs ?? 30_000;
    const signal = opts.signal ?? AbortSignal.timeout(timeoutMs);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...opts.headers,
        },
        body: JSON.stringify(body),
        signal,
    });
    const text = await res.text();
    if (!res.ok) {
        throw new HttpRequestError(url, res.status, text);
    }
    return JSON.parse(text);
}
//# sourceMappingURL=http.js.map