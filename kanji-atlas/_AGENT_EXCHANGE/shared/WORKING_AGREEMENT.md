# Kanji Atlas — Working Agreement

Status: Active
Version: 1.0
Updated: 2026-08-06

## Purpose

Keep product direction, implementation, evidence, and release approval visible to Zeynep, Codex, and Claude in one versioned location.

## Directory ownership

- `codex/specs/`: product and UX specifications with acceptance criteria.
- `codex/audits/`: independent review results and gate decisions.
- `codex/journal/`: concise session records.
- `claude/plans/`: implementation plans linked to an approved spec.
- `claude/checkpoints/`: implementation summaries and commit references.
- `claude/evidence/`: raw test logs, checksums, screenshots, and environment facts.
- `decisions/`: locked decisions and supersessions.
- `shared/`: current state and operating agreement.

## Status vocabulary

- PROPOSED: awaiting product decision.
- APPROVED: authorized for implementation.
- IN PROGRESS: implementation underway.
- QA: implementation complete, evidence under review.
- HOLD: a named condition blocks progression.
- READY FOR RELEASE: all release gates passed.
- RELEASED: deployed or store-approved with version and date.
- SUPERSEDED: retained for history but no longer authoritative.

## Handoff contract

Every implementation handoff must name:

- source spec;
- exact scope and files changed;
- branch and commit SHA;
- commands and tool versions;
- exit codes and raw outputs;
- known limitations;
- clean-tree result;
- rollback point.

Every Codex review must return PASS, PASS WITH CONDITIONS, or HOLD and list the evidence used.
