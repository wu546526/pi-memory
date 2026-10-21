export type PiMemoryPlatform = "darwin" | "win32" | "other";
export declare function getPlatform(): PiMemoryPlatform;
export declare function isWindows(): boolean;
export declare function isMacOS(): boolean;
/** Unix-like platforms where chmod / UDS cleanup apply. */
export declare function isUnixLike(): boolean;
//# sourceMappingURL=platform.d.ts.map