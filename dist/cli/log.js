import { theme } from "./theme.js";
function prefix() {
    return `${theme.prefix()} `;
}
export function createCliLog(opts = {}) {
    const debugOn = opts.debug ?? process.env.PI_MEMORY_DEBUG === "1";
    return {
        info(message) {
            if (!opts.verbose)
                return;
            console.error(prefix() + theme.info(message));
        },
        success(message) {
            console.error(prefix() + theme.success(message));
        },
        warn(message) {
            console.error(prefix() + theme.warn(message));
        },
        error(message) {
            console.error(prefix() + theme.error(message));
        },
        debug(message) {
            if (!debugOn && !opts.verbose)
                return;
            console.error(prefix() + theme.dim(message));
        },
        line(label, value) {
            console.error(`${prefix()}${theme.label(`${label}`.padEnd(16))} ${theme.value(value)}`);
        },
    };
}
//# sourceMappingURL=log.js.map