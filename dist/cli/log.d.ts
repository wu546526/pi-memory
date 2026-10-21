export type CliLogOptions = {
    verbose?: boolean;
    debug?: boolean;
};
export type CliLog = {
    info(message: string): void;
    success(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    line(label: string, value: string): void;
};
export declare function createCliLog(opts?: CliLogOptions): CliLog;
//# sourceMappingURL=log.d.ts.map