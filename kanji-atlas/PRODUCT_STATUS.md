# Kanji Atlas — Product Status

Updated: 2026-08-06

## Current state

- Portfolio state: Development / pre-release
- Web production source: `apps` monorepo, `kanji-atlas/`
- Local main: `403caabaed188d4e8671f13e85a0e428d98fbb10`
- Coordination branch: `codex/kanji-atlas-coordination`
- Gate 1 implementation tip: `b5c0545129da0c19c85b247c60dc2440bcbc4583`
- Gate 1 code tip: `cc57c4c10da7aeafbb126e7fd61d3a7d3a9fdf1d`
- Coordination setup commit: `1b7fc7a9547a4dcb234e872d115c95fc525510f1`
- Release state: HOLD

## Why release is on hold

- The Gate 1 correctness fixes are verified, but the regression-test inventory is not yet reliable.
- QA visibility policy and reduced-motion accessibility remain open.
- Native iOS and Android projects have not been generated and verified on real devices.
- Store metadata, privacy declarations, signing, screenshots, internal testing, and rollback evidence are incomplete.

## Current phase

Gate 1 complete. Preparing the bounded test-inventory repair gate before any merge to `main`.

## Phase 0 result

PASS. The canonical branch, coordination structure, and Claude project export are locally available and verified. The imported snapshot contains 106 in-scope documents; all source checksums match. No application code changed.

## Phase 1 result

PASS. Codex independently reproduced the critical audit findings and corrected the stale-path count from 9 to 16.

## Gate 1 result

PASS. Claude's four-commit bundle was verified, imported without rewriting commit identities, merged into the coordination branch, and independently retested by Codex. The fixes cover the three wrong reading/audio mappings, empty origin card, duplicate `style` attribute, and duplicate `nichiyoubi`. Audio files are byte-identical before and after.

## Next gate

Codex will define a narrow test-inventory contract. Claude must classify the 16 stale-path files, repair or formally retire active tests, and report raw evidence. `main`, deploy, landing, and native/store work remain out of scope until that gate is independently approved.
