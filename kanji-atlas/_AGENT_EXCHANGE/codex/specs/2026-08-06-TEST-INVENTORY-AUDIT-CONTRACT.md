# Claude Task Contract — Test Inventory Audit

Date: 2026-08-06  
Prepared by: Codex  
Executor: Claude  
Reviewer: Codex  
Status: **READY — READ ONLY**

## Goal

Turn the current mixed `_faz2` scripts into a trustworthy inventory before any repair work. This task is classification and planning only; it must not change application code, tests, tools, manifests, audio, or generated data.

## Starting point

- Source branch: `codex/kanji-atlas-coordination`
- Required starting commit: `a5892f566117b7e52fcb13859ed07672cb71c7f9`
- Gate 1 is PASS.
- `main`, merge, deploy, landing, native, and store work remain on HOLD.

## Scope

1. Enumerate every file under `kanji-atlas/_faz2/` that is presented as a test/check or references `atlas_drive_may30.html`.
2. Classify each file as exactly one of:
   - active release-gate test;
   - active developer diagnostic;
   - historical migration/edit tool;
   - obsolete historical artifact;
   - duplicate/superseded;
   - broken or presently unclassifiable.
3. For every file, record:
   - current purpose;
   - required inputs and dependencies;
   - whether those inputs exist in the repository;
   - whether it is portable outside `/home/claude`;
   - current measured result and exit code when safely runnable;
   - proposed disposition: retain, repair, replace, archive, or delete later.
4. Independently explain the two known red manifest checks and distinguish stale expectations from real product failures.
5. Propose one reproducible test entry point for a future implementation task, including Node/Playwright version pinning and a relative/parameterized application target.
6. Split the proposed implementation into small batches with acceptance criteria and rollback points.

## Required special handling

- The two filenames containing `OBSOLETE` must not be silently counted as active tests.
- Python edit/extract/inject scripts must not be counted as tests merely because they reference the stale HTML path.
- Pre/post regression comparators must identify whether their historical baseline still exists before being proposed as release gates.
- Do not change expected counts merely to make a red test green.
- Do not install dependencies or generate audio.

## Out of scope

- Editing or deleting any existing file
- Creating a test runner
- Fixing paths or expected values
- Application behavior changes
- QA visibility policy
- Reduced-motion implementation
- Merge to `main`, deploy, or store work

## Deliverable

Create one report under:

`kanji-atlas/_AGENT_EXCHANGE/claude/reports/2026-08-06-TEST-INVENTORY-AUDIT.md`

The report must contain:

- starting commit and working-tree status;
- a complete file-by-file inventory table;
- raw commands and exit codes;
- active release-gate suite proposed for retention;
- items proposed for archival or later deletion, without deleting them now;
- analysis of the known red checks;
- proposed implementation batches, each small enough for independent Codex review;
- risks, unknowns, and required decisions.

## Acceptance criteria

- All 16 stale-path references are accounted for without labeling all 16 as tests.
- All other `_faz2` smoke/check candidates are accounted for.
- No tracked application, test, tool, manifest, audio, or generated-data file changes.
- Only the requested report may be added.
- No merge, push to `main`, deploy, or Gate 3 implementation.

Codex will review the inventory before authorizing any repair batch.
