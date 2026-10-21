export type NotifyAfterWriteOptions = {
    skipConsolidateCheck?: boolean;
};
export type StoreListeners = {
    onSyncToSidecar(listener: () => void): () => void;
    onConsolidateCheck(listener: () => void): () => void;
    notifySyncToSidecar(): void;
    notifyAfterWrite(opts?: NotifyAfterWriteOptions): void;
};
/** Sidecar sync + debounced consolidate-check subscriptions after Ground Truth writes. */
export declare function createStoreListeners(isConsolidating: () => boolean): StoreListeners;
//# sourceMappingURL=listeners.d.ts.map