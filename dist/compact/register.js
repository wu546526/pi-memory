import { isSubagentSession } from "../utils/session/index.js";
import { runDualPurposeCompactionSummary } from "./runSummary.js";
export function registerCompactHandlers(pi, deps) {
    pi.on("session_before_compact", async (event, ctx) => {
        const llm = deps.getLlmClient();
        if (!llm)
            return;
        const { preparation, signal } = event;
        const workingUi = ctx.hasUI
            ? {
                show: () => ctx.ui.setWorkingMessage("Summarizing for memory…"),
                clear: () => ctx.ui.setWorkingMessage(),
            }
            : null;
        try {
            workingUi?.show();
            const summary = await runDualPurposeCompactionSummary(preparation, llm, signal);
            if (!summary)
                return;
            return {
                compaction: {
                    summary,
                    firstKeptEntryId: preparation.firstKeptEntryId,
                    tokensBefore: preparation.tokensBefore,
                },
            };
        }
        catch {
            return;
        }
        finally {
            workingUi?.clear();
        }
    });
    pi.on("session_compact", (event, ctx) => {
        const store = deps.getMemoryStore();
        if (!store)
            return;
        store.appendFromCompaction({
            compactionId: event.compactionEntry.id,
            summary: event.compactionEntry.summary,
            subagent: isSubagentSession(ctx),
            onComplete: () => deps.onCompactionIngested?.(),
        });
    });
}
//# sourceMappingURL=register.js.map