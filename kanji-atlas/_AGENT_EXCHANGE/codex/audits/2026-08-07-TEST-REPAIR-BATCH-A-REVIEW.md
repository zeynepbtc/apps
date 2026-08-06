# Codex Review — Test Repair Batch A

Date: 2026-08-07  
Executor: Claude  
Reviewer: Codex  
Reviewed delivery: `42a23eabf8833af51ea539dd72a762e93bf86abd`  
Decision: **FAIL — CORRECTION REQUIRED**

## Outcome

Claude's Batch A implementation passes in the container and in a temporary APFS worktree. It does not pass on the actual project volume, so Batch A is not closed and Batch B must not start.

No product, manifest, or audio defect was found. The remaining defect is in the orphan-audio comparison inside `manifest_check.js`.

## What passed

- Both repaired checks passed from repository root, `kanji-atlas/`, and `_faz2/` in an independent temporary worktree.
- All four required negative proofs failed with exit code 1 for the intended reason:
  - missing referenced audio;
  - orphan MP3;
  - duplicate `kategori + metin`;
  - JSON/embedded-manifest semantic drift.
- The temporary review worktree was clean after restoration.
- `manifest_build_check.js` also passes on the actual project volume.

## Blocking finding

On the actual external project volume, `manifest_check.js` reports 19 MP3 files as orphans. The filenames are exposed by the filesystem in Unicode NFD form while the canonical manifest paths are NFC. Raw JavaScript string comparison therefore treats the same logical filename as two different paths.

Observed result:

- raw comparison: 19 apparent orphans;
- NFC-normalized comparison: 0 orphans;
- files on disk whose raw names are not NFC: 19.

Representative pairs include `chīzu.mp3`, `fōku.mp3`, `gēmu.mp3`, and `kōhī.mp3`. The files and manifest must not be renamed or rewritten: this is a cross-platform comparison defect in the test.

## History and rollback

The delivery was provisionally merged as `e8c5022` after container/APFS verification. Once the external-volume failure was discovered, that merge was reverted by `37aef83`. Neither the provisional merge nor its revert had been pushed at the time of discovery. Both are retained in history as an auditable record.

## Required disposition

Claude must add a narrowly scoped correction on top of its existing Batch A branch. Codex will then reproduce the positive test on the actual external volume, repeat the orphan negative proof, and verify normalization-collision protection before issuing PASS.

Gates remain:

- Batch A: **FAIL / correction pending**
- Batch B: **HOLD**
- Web release: **HOLD**

