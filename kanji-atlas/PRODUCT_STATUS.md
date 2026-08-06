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
- Release state: HOLD

## Why release is on hold

- Claude's release audit is not yet fully exported into the repository.
- Its serious findings have not yet been independently reproduced by Codex.
- Native iOS and Android projects have not been generated and verified on real devices.
- Store metadata, privacy declarations, signing, screenshots, internal testing, and rollback evidence are incomplete.

## Current phase

Phase 0 — canonical source recovery and coordination setup.

## Next gate

Phase 0 passes only when:

- the local worktree is clean and matches `db743d7`;
- required Claude project documents are exported with a manifest;
- the `_AGENT_EXCHANGE` workflow is present and readable by both agents;
- no product code has changed during setup;
- the Phase 0 evidence report is complete.
