import net from "node:net";
export function waitUntilReady(predicate, timeout) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timeout waiting for predicate after ${timeout}ms`));
        }, timeout);
        const interval = setInterval(async () => {
            if (await predicate()) {
                clearInterval(interval);
                clearTimeout(timer);
                resolve();
            }
        }, 100);
    });
}
export function canConnect(socketPath) {
    return new Promise((resolve) => {
        const socket = net.connect(socketPath);
        socket.on("connect", () => {
            resolve(true);
        });
        socket.on("error", () => {
            resolve(false);
        });
    });
}
//# sourceMappingURL=utils.js.map