# Codex Closure — Test Repair Batch A

Date: 2026-08-07  
Executor: Claude  
Reviewer: Codex  
Delivery tip: `bbd1f0074b12a4929cf314b45fd93409729b5c7f`  
Decision: **PASS**

## Scope

This decision closes the original Batch A delivery at `42a23ea` together with the Unicode correction at `bbd1f00`.

The correction bundle was verified, imported, and reviewed without first merging it into the coordination branch. The correction changes only `manifest_check.js` plus the allowed Claude report and evidence files. `manifest_build_check.js`, product data, manifests, generated data, and audio are unchanged by the correction commit.

## Independent results

Codex ran the delivered scripts from a detached review worktree against the actual Atlas tree on `/Volumes/Zeynep-G`.

### Actual external-volume positive proof

- `manifest_check.js`: exit 0
- manifest entries: 610
- disk MP3 files: 473
- filesystem paths exposed outside NFC: 19
- raw comparison would report: 19 false orphans
- NFC logical comparison reports: 0 orphans
- disk normalization collisions: 0
- manifest normalization collisions: 0

This directly reproduces and resolves the blocking environment that caused the first Batch A review to fail.

### Build-manifest regression proof

- `manifest_build_check.js`: exit 0
- embedded and canonical manifests remain semantically equal
- runtime-fetch and pedagogy gates remain green

### Independent true-orphan negative proof

Codex added `audio/kana/__codex_true_orphan.mp3` only inside the detached temporary review worktree.

- `manifest_check.js`: exit 1
- failure occurred at gate 6c
- reported exactly one true orphan
- fixture was removed afterward
- detached review worktree returned clean

Claude's supplied NFD, disk-collision, manifest-collision, traversal, and prior Batch A regression evidence is consistent with the reviewed implementation. Code inspection confirmed normalization is applied to comparison keys, raw and normalized paths both retain the safety predicate, and ambiguous normalized keys fail rather than collapse silently.

## Decision

Batch A satisfies its portability, invariant, negative-proof, and actual external-volume requirements.

- Batch A: **PASS / CLOSED**
- Batch B: **READY for a separate contract**
- Web release: **HOLD**

No Batch B implementation is authorized by this closure alone.
