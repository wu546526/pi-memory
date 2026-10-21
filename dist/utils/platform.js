export function getPlatform() {
    if (process.platform === "darwin")
        return "darwin";
    if (process.platform === "win32")
        return "win32";
    return "other";
}
export function isWindows() {
    return process.platform === "win32";
}
export function isMacOS() {
    return process.platform === "darwin";
}
/** Unix-like platforms where chmod / UDS cleanup apply. */
export function isUnixLike() {
    return !isWindows();
}
//# sourceMappingURL=platform.js.map