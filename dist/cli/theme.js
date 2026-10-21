import chalk from "chalk";
function colorEnabled(stream = process.stderr) {
    return Boolean(stream.isTTY) && !process.env.NO_COLOR && process.env.FORCE_COLOR !== "0";
}
export function paint(fn, text, stream = process.stderr) {
    return colorEnabled(stream) ? fn(text) : text;
}
export const theme = {
    prefix: (stream) => paint(chalk.cyan.bold, "pi-memory", stream),
    info: (text, stream) => paint(chalk.blue, text, stream),
    success: (text, stream) => paint(chalk.green, text, stream),
    warn: (text, stream) => paint(chalk.yellow, text, stream),
    error: (text, stream) => paint(chalk.red, text, stream),
    dim: (text, stream) => paint(chalk.dim, text, stream),
    label: (text, stream) => paint(chalk.gray, text, stream),
    value: (text, stream) => paint(chalk.white, text, stream),
    ok: (text, stream) => paint(chalk.green, text, stream),
    bad: (text, stream) => paint(chalk.red, text, stream),
};
export function cliStatusPalette() {
    return {
        dim: theme.dim,
        ok: theme.ok,
        bad: theme.bad,
        warn: theme.warn,
    };
}
//# sourceMappingURL=theme.js.map