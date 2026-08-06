# Codex Review — Test Inventory Audit

Date: 2026-08-06  
Claude report: `claude/reports/2026-08-06-TEST-INVENTORY-AUDIT.md`  
Claude commit: `471c9acb3f597e37a76edcaa7aaa669c46816d1e`  
Decision: **PASS WITH SEQUENCING CORRECTION**

## Accepted findings

- The report is the only change from its required starting commit.
- All 16 `atlas_drive_may30.html` references are accounted for and are not misrepresented as 16 active tests.
- The two `OBSOLETE` files and five Python edit/extract/inject tools are correctly excluded from the active test count.
- The three historical HTML baselines do not exist in the repository or its reachable history.
- `qa_kyuu_round.js` writes to `index.html`; `harness.js` writes to a tracked report. They must never enter a release-gate whitelist under their current names.
- Claude detected and reverted the temporary `index.html` mutation; the delivered commit contains only the report.

## Independent correction

On this Mac, `manifest_check.js` and `manifest_build_check.js` do not reach their stale assertions. Both first fail with `ENOENT` because they hard-code `/home/claude/apps-deploy`. Therefore the proposed A → B → C sequence cannot be used literally: portability for these two files is a prerequisite to independently proving the invariant repair.

The first implementation batch will combine only:

1. relative/parameterized target resolution for these two manifest checks; and
2. replacement of historical snapshot counts with release-quality invariants.

No other path conversion, runner, archival move, rename, or application change belongs in this batch.

## Gate status

The inventory audit is accepted. Test repair has not begun. `main`, deploy, landing, and store work remain on HOLD.
