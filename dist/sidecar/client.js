// Agent 侧：发送请求到 sidecar
import { randomUUID } from "node:crypto";
import net from "node:net";
import { SIDECAR_PING_TIMEOUT_MS, SIDECAR_QUERY_TIMEOUT_MS, SIDECAR_REINDEX_TIMEOUT_MS, } from "../constants/timing.js";
import { JsonlFramer, parseJsonlLine, serializeJsonlFrame } from "../utils/jsonl.js";
import { isErrorResponse } from "./protocol.js";
export function sidecarRequest(socketPath, frame, options = {}) {
    const timeoutMs = options.timeoutMs ?? SIDECAR_QUERY_TIMEOUT_MS;
    const { signal } = options;
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(abortError(signal));
            return;
        }
        const socket = net.connect(socketPath);
        const framer = new JsonlFramer();
        let settled = false;
        const cleanup = () => {
            clearTimeout(timer);
            signal?.removeEventListener("abort", onAbort);
        };
        const fail = (error) => {
            if (settled)
                return;
            settled = true;
            cleanup();
            socket.destroy();
            reject(error);
        };
        const succeed = (value) => {
            if (settled)
                return;
            settled = true;
            cleanup();
            resolve(value);
        };
        const onAbort = () => {
            fail(abortError(signal));
        };
        const timer = setTimeout(() => {
            fail(new Error("Sidecar request timed out"));
        }, timeoutMs);
        if (signal) {
            signal.addEventListener("abort", onAbort, { once: true });
        }
        socket.on("connect", () => {
            socket.write(serializeJsonlFrame(frame));
        });
        socket.on("data", (chunk) => {
            for (const line of framer.push(chunk.toString())) {
                socket.end();
                let response;
                try {
                    response = parseJsonlLine(line);
                }
                catch {
                    fail(new Error("Invalid JSON response from sidecar"));
                    return;
                }
                if (isErrorResponse(response)) {
                    fail(new Error(response.error));
                    return;
                }
                succeed(response);
                return;
            }
        });
        socket.on("error", (error) => {
            fail(error instanceof Error ? error : new Error(String(error)));
        });
    });
}
function abortError(signal) {
    return signal.reason instanceof Error ? signal.reason : new Error("Aborted");
}
export async function ping(socketPath) {
    try {
        const res = await sidecarRequest(socketPath, { type: "ping" }, { timeoutMs: SIDECAR_PING_TIMEOUT_MS });
        return res.type === "pong";
    }
    catch {
        return false;
    }
}
export async function fetchIndexStats(socketPath) {
    try {
        const res = await sidecarRequest(socketPath, { type: "stats" }, { timeoutMs: SIDECAR_PING_TIMEOUT_MS });
        if (res.type !== "stats_ok")
            return { error: "unexpected sidecar response" };
        const { type: _type, ...stats } = res;
        return { stats };
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { error: message };
    }
}
export async function query(socketPath, queryText, options = {}) {
    const request_id = randomUUID();
    return sidecarRequest(socketPath, { type: "query", request_id, query: queryText }, options);
}
export async function reindex(socketPath, documents = []) {
    const request_id = randomUUID();
    return sidecarRequest(socketPath, { type: "reindex", request_id, documents }, { timeoutMs: SIDECAR_REINDEX_TIMEOUT_MS });
}
//# sourceMappingURL=client.js.map