# Kanji Atlas — Product Status

Updated: 2026-08-06

## Current state

- Portfolio state: Development / pre-release
- Web production source: `apps` monorepo, `kanji-atlas/`
- Local main: `403caabaed188d4e8671f13e85a0e428d98fbb10`
- Active product branch: `onboarding-b2-gate3`
- Active branch HEAD: `db743d7f9ed3a7197ed9a26d07c5f512ca06acf3`
- Active branch vs remote tracking branch: behind 0 / ahead 0
- Active branch vs `origin/main`: behind 6 / ahead 97
- Coordination setup commit: `1b7fc7a9547a4dcb234e872d115c95fc525510f1`
- Release state: HOLD

## Why release is on hold

- Its serious findings have not yet been independently reproduced by Codex.
- Native iOS and Android projects have not been generated and verified on real devices.
- Store metadata, privacy declarations, signing, screenshots, internal testing, and rollback evidence are incomplete.

## Current phase

Phase 1 — independent reproduction of the release-audit findings.

## Phase 0 result

PASS. The canonical branch, coordination structure, and Claude project export are locally available and verified. The imported snapshot contains 106 in-scope documents; all source checksums match. No application code changed.

## Next gate

Phase 1 passes only when:

- Claude's critical findings are independently reproduced or rejected against the local branch;
- each finding has a precise code/data location and severity;
- the minimum pre-merge fix scope has acceptance criteria;
- no implementation begins before that scope is approved.
