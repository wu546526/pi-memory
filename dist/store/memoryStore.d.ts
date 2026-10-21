import { type TimeInput } from "../utils/time.js";
import type { ConsolidateStoreAccess } from "./consolidatePort.js";
import type { IndexDocument, IntegrityReport, MemoryStats, MemoryStoreOptions, ParsedEntry, ResolvedMemory, StoreMemoryEntry } from "./types.js";
export declare class MemoryStore implements ConsolidateStoreAccess {
    private readonly paths;
    private readonly backend;
    private readonly maxLines;
    private readonly fallbackMaxChars;
    private readonly listeners;
    private consolidating;
    constructor(opts: MemoryStoreOptions);
    private collectResolvedOpts;
    private writePathDeps;
    get agentDir(): string;
    ensureInitialized(): Promise<void>;
    isEmpty(): Promise<boolean>;
    getStats(): Promise<MemoryStats>;
    readRaw(): Promise<string>;
    listEntries(): Promise<ParsedEntry[]>;
    readResolved(): Promise<ResolvedMemory>;
    readForFallback(maxChars?: number): Promise<string>;
    exportForIndex(): Promise<IndexDocument[]>;
    append(entry: StoreMemoryEntry): Promise<void>;
    appendUser(entry: Omit<StoreMemoryEntry, "userAuthored">): Promise<void>;
    appendMany(entries: StoreMemoryEntry[], opts?: {
        mode?: "ifAbsent";
    }): Promise<number>;
    appendIfAbsent(entry: StoreMemoryEntry): Promise<boolean>;
    appendFromCompaction(opts: {
        compactionId: string;
        summary: string;
        subagent?: boolean;
        onComplete?: () => void | Promise<void>;
    }): void;
    private ingestCompactionSummary;
    updateEntry(id: string, patch: Partial<StoreMemoryEntry>): Promise<void>;
    removeEntry(id: string, opts?: {
        force?: boolean;
    }): Promise<void>;
    rewrite(content: string): Promise<void>;
    shouldConsolidate(at?: TimeInput, cronFired?: boolean): Promise<boolean>;
    isConsolidating(): boolean;
    rewriteMemoryUnderLock(updateEntries: (entries: ParsedEntry[]) => Promise<ParsedEntry[]>): Promise<void>;
    hasProcessedCompaction(compactionId: string): Promise<boolean>;
    markCompactionProcessed(compactionId: string): Promise<void>;
    verifyIntegrity(): Promise<IntegrityReport>;
    onSyncToSidecar(listener: () => void): () => void;
    onConsolidateCheck(listener: () => void): () => void;
    private readResolvedUnlocked;
    private newEntryId;
    private newAutoFilePath;
    private readGcTimestamp;
    private readCompactionState;
}
export declare function createMemoryStore(opts: MemoryStoreOptions): MemoryStore;
//# sourceMappingURL=memoryStore.d.ts.map