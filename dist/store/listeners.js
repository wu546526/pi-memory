/** Sidecar sync + debounced consolidate-check subscriptions after Ground Truth writes. */
export function createStoreListeners(isConsolidating) {
    const syncToSidecarListeners = new Set();
    const consolidateCheckListeners = new Set();
    return {
        onSyncToSidecar(listener) {
            syncToSidecarListeners.add(listener);
            return () => syncToSidecarListeners.delete(listener);
        },
        onConsolidateCheck(listener) {
            consolidateCheckListeners.add(listener);
            return () => consolidateCheckListeners.delete(listener);
        },
        notifySyncToSidecar() {
            for (const listener of syncToSidecarListeners)
                listener();
        },
        notifyAfterWrite(opts) {
            for (const listener of syncToSidecarListeners)
                listener();
            if (!opts?.skipConsolidateCheck && !isConsolidating()) {
                for (const listener of consolidateCheckListeners)
                    listener();
            }
        },
    };
}
//# sourceMappingURL=listeners.js.map