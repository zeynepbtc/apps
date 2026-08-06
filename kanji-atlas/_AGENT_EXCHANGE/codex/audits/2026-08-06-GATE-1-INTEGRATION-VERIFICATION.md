# Gate 1 — Codex Integration Verification

Date: 2026-08-06

Decision: **PASS**

## Inputs

- Contract: `codex/specs/2026-08-06-GATE-1-FIX-CONTRACT.md`
- Claude bundle tip: `b5c0545129da0c19c85b247c60dc2440bcbc4583`
- Last application-code commit: `cc57c4c10da7aeafbb126e7fd61d3a7d3a9fdf1d`
- Base: `db743d7f9ed3a7197ed9a26d07c5f512ca06acf3`
- Bundle archive: `00-SUREC-ve-ROADMAP/kanji-atlas/transfers/2026-08-06/gate1-claude-fixes-2026-08-06.bundle` (outside Git)

The bundle passed `git bundle verify`; its four commit identities matched Claude's delivery. It was imported under `refs/remotes/claude/` and merged into the coordination branch with histories preserved.

## Independent acceptance checks

- `明`: `akarui` with existing `audio/word/akarui.mp3`.
- `晴`: `hare` with existing `audio/word/hare.mp3`; this represents the first example `晴れ` and avoids generating new audio.
- `言` example `話`: `hanashi`; no `話/hana` manifest record remains.
- `話す/hanasu` and the main `話/hanasu` record remain intact.
- Empty, whitespace-only, pending, and drafted origin content does not render an origin card.
- The review button emits one `style` attribute in enabled and disabled states.
- `日.n5_words` contains `nichiyoubi` exactly once.
- `data_chars.json` and `CONTENT_HASH` are synchronized.
- The before/after SHA-256 inventories for 473 MP3 files are identical; the application-code diff contains no file under `kanji-atlas/audio/`.

## Independently rerun checks

- content scaffold: `401/401`
- legacy derived: `83/83`
- durable backend: `9/9`
- game roles: `62/62`
- storage checks: 0 failures
- SRS checks: 0 failures

Two Playwright-dependent smoke scripts could not be rerun on this Mac because the local dependency is absent. Claude's raw passing logs are preserved in `claude/evidence/2026-08-06-gate1/`. This does not block Gate 1 because all contract acceptance criteria were independently verified through data, manifest, rendered-output construction, and immutable Git/audio evidence. Browser dependency and test-environment normalization belong to the next test-inventory gate.

## Remaining hold

No merge to `main`, deploy, landing link, or native/store work is authorized. The next gate must classify and repair or formally retire the 16 files tied to `atlas_drive_may30.html`, address the already-red tests, and establish a reproducible test command and environment.
