# Kanji Atlas — Product Status

Updated: 2026-08-07

## Current state

- Portfolio state: Development / pre-release
- Web production source: `apps` monorepo, `kanji-atlas/`
- Coordination branch: `codex/kanji-atlas-coordination`
- Coordination tip: `e0abee68d94d55c42f0d79ed7a835215dc5b9afb`
- Gate 1 correctness fixes: PASS
- Test repair Batches A-E: PASS
- Release state: HOLD

## Why release is on hold

- Content authoring is not frozen: `南`, `今`, `白`, `九` and editorial harmonization remain open.
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
- 57 reviewed etymology records
- 2 drafted and hidden records: `九`, `南`
- 30 visible legacy origin records
- 87 records with a user-visible origin
- `今` and `白` remain empty; seven radical records intentionally hide origin

## Next gate

Authoring Batch 17 opens only `南` after applying DECISION-002 (`mnemonic: not_required`). `今`, `白`, `九`, editorial harmonization, Content Freeze, `main`, deploy, landing, native, and store remain out of scope until their named gates pass.
