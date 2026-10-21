import { type Server } from "node:net";
export type SidecarServerOpts = {
    socketPath: string;
    dbPath: string;
};
export type SidecarServer = {
    server: Server;
    shutdown: () => void;
};
export declare function createSidecarServer(opts: SidecarServerOpts): SidecarServer;
//# sourceMappingURL=server.d.ts.map