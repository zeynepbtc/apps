# Kanji Atlas — Product Status

Updated: 2026-08-07

## Current state

- Portfolio state: Development / pre-release
- Web production source: `apps` monorepo, `kanji-atlas/`
- Coordination branch: `codex/kanji-atlas-coordination`
- Batch 17 PASS/coordination tip: `13a62c5`
- Gate 1 correctness fixes: PASS
- Test repair Batches A-E: PASS
- Release state: HOLD

## Why release is on hold

- Content authoring is not frozen: `今`, `白`, `九` and editorial harmonization remain open.
- QA visibility policy and reduced-motion accessibility remain open.
- Native iOS and Android projects have not been generated and verified on real devices.
- Store metadata, privacy declarations, signing, screenshots, internal testing, and rollback evidence are incomplete.

## Current phase

Regression gate repair is complete. Beginning bounded content closure before Content Freeze v1.0.

## Phase 0 result

PASS. The canonical branch, coordination structure, and Claude project export are locally available and verified. The imported snapshot contains 106 in-scope documents; all source checksums match. No application code changed.

## Phase 1 result

PASS. Codex independently reproduced the critical audit findings and corrected the stale-path count from 9 to 16.

## Gate 1 result

PASS. Claude's four-commit bundle was verified, imported without rewriting commit identities, merged into the coordination branch, and independently retested by Codex. The fixes cover the three wrong reading/audio mappings, empty origin card, duplicate `style` attribute, and duplicate `nichiyoubi`. Audio files are byte-identical before and after.

## Regression gate result

PASS. The test inventory was classified and cleaned; active core and real-Chromium gates are portable and deterministic. The canonical default command currently covers 10 core and 4 browser gates. Batch E removed the home-recommendation gate's external-font timeout dependency without weakening its 57 assertions.

## Current content measurement

- 98 total character records
- 58 reviewed etymology records
- 1 drafted and hidden record: `九`
- 30 visible legacy origin records
- 88 records with a user-visible origin
- `今` is source-researched and closed as HOLD without a draft; `白` remains empty; seven radical records intentionally hide origin

## Next gate

Authoring Batch 18 is PASS with result **B / HOLD**: `今` has no defensible cross-source origin spine, so no product-data write was made and it remains hidden. The next bounded content gate is `白` research + hidden draft only. `九`, editorial harmonization, the disputed-origin product pattern, Content Freeze, `main`, deploy, landing, native, and store remain out of scope until their named gates pass.
