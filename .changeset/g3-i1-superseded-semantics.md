---
'@chendpoc/pi-memory': patch
---

Fix: skip episodic fallback result when it duplicates sessionMemoryCap — when the sidecar is unavailable the fallback injected a second copy of MEMORY.md alongside the cap (~15K chars duplicated). Consolidation merge prompt gains a superseded-semantics rule: stale tails in older entries get rewritten when a newer entry states the outcome (never touches [user] lines).
