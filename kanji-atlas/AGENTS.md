# Kanji Atlas Agent Rules

This file governs work under `kanji-atlas/`.

## Source of truth

- The active implementation branch is recorded in `PRODUCT_STATUS.md`.
- Locked product decisions live in `_AGENT_EXCHANGE/decisions/`.
- A chat message, cloud-only document, or verbal test claim is not canonical until it is exported here and committed.

## Roles

- Zeynep: vision, scope, real-device testing, store accounts, final go/no-go.
- Codex: product architecture, UX, pedagogy, release gates, specs, independent audit.
- Claude: implementation, data changes, test automation, technical evidence.

## Required workflow

1. Codex writes a scoped spec or audit with acceptance criteria.
2. Claude writes an implementation plan before changing product code.
3. Claude implements on a feature branch and saves raw evidence.
4. Codex independently reviews the diff and evidence.
5. Merge or release requires an explicit passed gate.

## Safety rules

- No direct pushes or web uploads to `main`.
- No merge, deploy, store submission, deletion, or folder migration without its named gate.
- Do not store credentials, tokens, recovery codes, signing keys, or private certificates in this repository.
- Preserve raw commands, tool versions, exit codes, test output, commit SHA, and clean-tree status for release claims.
- Do not edit files belonging to sibling products.
