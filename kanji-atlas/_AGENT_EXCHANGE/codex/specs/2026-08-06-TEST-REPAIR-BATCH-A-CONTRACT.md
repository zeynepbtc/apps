# Claude Task Contract — Test Repair Batch A

Date: 2026-08-06  
Prepared by: Codex  
Executor: Claude  
Reviewer: Codex  
Status: **READY**

## Goal

Make the two manifest integrity checks portable and meaningful without changing product data or merely updating frozen counts.

## Starting point

- Source branch: `codex/kanji-atlas-coordination`
- Required starting commit: supplied in the handoff after this contract is pushed
- Inventory audit: PASS with sequencing correction

## Allowed files

- `kanji-atlas/_faz2/manifest_check.js`
- `kanji-atlas/_faz2/manifest_build_check.js`
- one delivery report under `kanji-atlas/_AGENT_EXCHANGE/claude/reports/`
- optional evidence text files under `kanji-atlas/_AGENT_EXCHANGE/claude/evidence/2026-08-06-test-repair-a/`

No other tracked file may change.

## Required implementation

### 1. Portability

- Remove the `/home/claude/apps-deploy` dependency from both checks.
- Resolve the Atlas directory from each script's own location by default.
- If an override is added, it must be an explicit CLI argument or environment variable and must be documented.
- A normal invocation from the repository root and from `kanji-atlas/` must produce the same result.

### 2. `manifest_check.js` invariants

Retain or strengthen these protections:

- IDs are unique and required fields/enums are valid.
- Every release entry is `recorded`, has a valid relative audio path, and the referenced file exists.
- No `missing` or `tts` entry remains at the release gate.
- `kategori + metin` is unique.
- Audio paths stay under the allowed Atlas audio directories.
- Every MP3 under `kanji-atlas/audio/` is referenced by at least one manifest entry; shared references are allowed.
- If a `kaynak: flick` entry exists, it must be recorded and its referenced Flick source must exist. Absence of Flick entries must not make the test depend on a missing sibling directory.
- `_meta.pedagojik_hukum` remains required.

Remove historical snapshot assertions such as fixed category totals, `214/47/74`, all sentences being TTS, or `flick ⇔ recorded`. Do not replace them with today's fixed totals.

### 3. `manifest_build_check.js` invariants

- Preserve anchor detection, semantic equality between embedded and canonical manifest, runtime-fetch prohibition, manifest consumption, and pedagogy metadata checks.
- Remove the fixed `entries === 335` assertion.
- Do not replace it with `610` or another current fixed total.

### 4. Negative-proof requirement

Using temporary copies outside the repository, demonstrate that the repaired checks fail for at least:

- a recorded entry whose audio file is missing;
- an orphan MP3 not referenced by the manifest;
- a duplicate `kategori + metin` entry;
- embedded manifest content that differs semantically from the JSON manifest.

The repository working tree must remain clean after these negative tests.

## Out of scope

- Application, manifest, audio, or generated-data changes
- Other test files or absolute paths
- Test runner/package setup
- Renames, moves, archives, or deletions
- QA visibility, accessibility, merge, deploy, native, or store work

## Acceptance criteria

- Both checks exit 0 on the unmodified product tree on this Mac-compatible relative layout and in Claude's container.
- Both work from repository root and `kanji-atlas/`.
- All four negative proofs exit non-zero for the intended reason.
- No current totals are frozen as expected counts.
- Only allowed files change.
- Raw commands, exit codes, tool versions, starting/ending SHA, rollback point, and working-tree status are reported.

Codex must reproduce the positive and negative proofs before Batch A passes.
