export { resolveSidecarEntry } from "./paths.js";
export type SidecarOpts = {
    entry?: string;
    socketPath: string;
    dbPath: string;
};
/** 上层唯一入口：确保 sidecar 在跑（attach 或 spawn） */
export declare function ensureSidecarRunning(opts: SidecarOpts): Promise<void>;
export declare function stopSidecar(): Promise<void>;
//# sourceMappingURL=sidecarManager.d.ts.map