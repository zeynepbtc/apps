# Claude Task Contract — Batch A Unicode Correction

Date: 2026-08-07  
Prepared by: Codex  
Executor: Claude  
Reviewer: Codex  
Status: **READY**

## Goal

Make the orphan-audio integrity check reliable across filesystems that expose equivalent Unicode filenames in NFC or NFD form, without changing product data or weakening path safety.

## Starting point

- Continue Claude's existing branch: `repair/batch-a-2026-08-06`
- Required base commit: `42a23eabf8833af51ea539dd72a762e93bf86abd`
- Add one correction commit on top of that delivery.
- Read the Codex review: `kanji-atlas/_AGENT_EXCHANGE/codex/audits/2026-08-07-TEST-REPAIR-BATCH-A-REVIEW.md`

## Allowed files

- `kanji-atlas/_faz2/manifest_check.js`
- one correction report under `kanji-atlas/_AGENT_EXCHANGE/claude/reports/`
- optional evidence files under `kanji-atlas/_AGENT_EXCHANGE/claude/evidence/2026-08-07-test-repair-a-unicode/`

`manifest_build_check.js` and all product, manifest, generated-data, and audio files must remain unchanged from commit `42a23ea`.

## Required implementation

### 1. Canonical comparison

- Normalize both manifest-referenced paths and filesystem-discovered MP3 paths to Unicode NFC before logical set comparison.
- Apply normalization to comparison keys, not by renaming files or rewriting the manifest.
- Keep actual file-existence validation functional on the host filesystem.

### 2. Preserve path security

Normalization must not weaken the existing checks. Every manifest path must still be:

- relative;
- free of `..` traversal;
- under an allowed Atlas audio directory;
- associated with an existing file.

Validation of unsafe raw input must happen in a way that Unicode normalization cannot conceal a prohibited path.

### 3. Detect normalization collisions

If two distinct raw filesystem paths normalize to the same NFC logical path, the test must fail clearly. Do not silently collapse ambiguous disk entries into one set member.

The same principle should be applied wherever distinct raw manifest paths could become ambiguous after normalization.

## Required proofs

From a clean tree, report commands and exit codes for:

1. normal positive run of `manifest_check.js`;
2. a temporary NFD filename fixture that is referenced by the NFC-equivalent manifest path and must pass;
3. a genuine orphan MP3 fixture that must still fail;
4. two distinct raw filenames that normalize to the same NFC path and must fail as a normalization collision.

All destructive fixtures must be created in temporary copies outside the repository. The repository must remain clean.

## Out of scope

- Renaming or editing audio files
- Editing either manifest representation
- Editing `manifest_build_check.js`
- Broad refactors or changes to any other test
- Batch B work

## Acceptance criteria

- The corrected test passes on Claude's clean product copy and simulated NFD fixture.
- Orphan detection still fails for a true orphan.
- Normalization collisions fail with a specific, understandable diagnostic.
- Only allowed files change.
- Report includes base/tip SHA, changed-file list, commands, exit codes, runtime version, rollback point, and final clean status.
- Delivery is a new Git bundle containing the original Batch A commit and the correction commit.

Codex will run the final positive proof on the actual external project volume. Batch A remains FAIL until that independent check passes.
