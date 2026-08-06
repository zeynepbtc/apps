# DECISION-001 — Source of Truth and Agent Exchange Location

Status: APPROVED
Date: 2026-08-06
Owner: Zeynep

## Decision

Until Kanji Atlas is separated into its own repository, its versioned coordination records live under:

`kanji-atlas/_AGENT_EXCHANGE/`

The GitHub branch is the code source of truth. Claude-project documents are non-canonical until exported here and committed. The temporary local worktree is a working copy, not a new source of truth.

When Kanji Atlas becomes an independent product repository, this directory moves with the product and retains history.

## Main branch policy

No direct GitHub web uploads or direct pushes to `main`. Work happens on named branches, is reviewed against a gate, and is merged only after approval.

## Supersedes

This decision supersedes the cloud-only document workflow for Kanji Atlas.
