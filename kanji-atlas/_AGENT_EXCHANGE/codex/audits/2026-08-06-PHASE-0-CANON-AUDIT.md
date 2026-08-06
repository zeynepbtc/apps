# Phase 0 — Canonical Source Audit

Status: IN PROGRESS
Date: 2026-08-06
Reviewer: Codex

## Scope

Recover a locally inspectable canonical branch and establish the coordination system without changing application code, merging, deploying, or moving the product.

## Verified facts

- Original HDD checkout was clean at `54bf1a3` on `main`.
- `origin/main` was one commit ahead at `403caab`; the intervening commit changed only `stock-ui/erp/index.html`.
- Local `main` advanced to `403caab` using `git merge --ff-only origin/main`.
- Remote branch `origin/onboarding-b2-gate3` resolves to `db743d7f9ed3a7197ed9a26d07c5f512ca06acf3`.
- The product branch is behind `origin/main` by 6 and ahead by 97.
- A separate local worktree was created at `/Volumes/Zeynep-G/PROJECT/APPS/web/github/_worktrees/kanji-atlas-onboarding-b2-gate3`.
- The worktree is clean and matches its remote branch: behind 0 / ahead 0.
- The branch contains the Capacitor scaffold under `kanji-atlas/native/`.
- No merge, deploy, store submission, deletion, or application-code edit occurred in this phase.

## Open conditions

- Export Claude project documents and their manifest into `_AGENT_EXCHANGE/claude/`.
- Independently reproduce the release-audit findings on the local branch.
- Record checksums for the exported documents.
- Recheck both worktrees are clean after documentation setup.

## Gate

HOLD until the open conditions above are complete.
