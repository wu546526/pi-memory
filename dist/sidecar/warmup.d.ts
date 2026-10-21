export type WarmSidecarOptions = {
    queryTimeoutMs?: number;
};
/** Pre-open sidecar DB and optionally smoke-test embed + vec paths. Fail-silent. */
export declare function warmSidecar(socketPath: string, options?: WarmSidecarOptions): Promise<void>;
//# sourceMappingURL=warmup.d.ts.map