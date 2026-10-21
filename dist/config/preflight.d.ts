export type PreflightRuntimeConfig = {
    intentRetries: number;
    warmSidecar: boolean;
    intentCache: boolean;
};
/** Runtime toggles for preflight latency optimizations. */
export declare function readPreflightRuntimeConfig(env?: NodeJS.ProcessEnv): PreflightRuntimeConfig;
//# sourceMappingURL=preflight.d.ts.map