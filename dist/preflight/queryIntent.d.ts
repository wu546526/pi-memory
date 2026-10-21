import { Type, type Static } from "typebox";
import type { LlmClient } from "../adapters/llm/types.js";
/** Structured intent from helper LLM — simpler than crafting a search query directly. */
export declare const QueryIntentSchema: Type.TObject<{
    raw_query: Type.TOptional<Type.TString>;
    what: Type.TOptional<Type.TString>;
    who: Type.TOptional<Type.TString>;
    where: Type.TOptional<Type.TString>;
}>;
export type QueryIntent = Static<typeof QueryIntentSchema>;
export declare function parseQueryIntent(value: unknown): QueryIntent;
export declare function shouldRunEpisodicPreflight(query: string, forceEpisodic?: boolean): boolean;
export declare function shouldExtractIntent(query: string, forceIntent?: boolean): boolean;
/** Pure function: concatenate intent fields into a sidecar query string. */
export declare function buildRetrievalQuery(intent: QueryIntent, userInput: string): string;
export type ExtractQueryIntentOptions = {
    forceIntent?: boolean;
    signal?: AbortSignal;
    sessionId?: string;
    intentCache?: boolean;
    intentRetries?: number;
};
export type ExtractQueryIntentResult = {
    intent: QueryIntent;
    skipped: boolean;
    cacheHit: boolean;
};
export declare function extractQueryIntent(userInput: string, llm: LlmClient | null, options?: ExtractQueryIntentOptions): Promise<ExtractQueryIntentResult>;
//# sourceMappingURL=queryIntent.d.ts.map