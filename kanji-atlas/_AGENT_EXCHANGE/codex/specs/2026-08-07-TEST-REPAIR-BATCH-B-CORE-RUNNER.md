# Claude Task Contract — Test Repair Batch B: Core Gate Runner

Date: 2026-08-07  
Prepared by: Codex  
Executor: Claude  
Reviewer: Codex  
Status: **READY**

## Goal

Create one portable, deterministic, dependency-free entry point for the ten fast release-gate checks that are already independently green.

This batch packages existing protections; it does not repair, rewrite, rename, or broaden any individual test.

## Starting point

- Source branch: `codex/kanji-atlas-coordination`
- Required starting commit: supplied in the handoff after this contract is pushed
- Batch A closure: `kanji-atlas/_AGENT_EXCHANGE/codex/audits/2026-08-07-TEST-REPAIR-BATCH-A-CLOSURE.md`

Create a new Claude branch from the exact required commit.

## Sequencing correction

The inventory report originally proposed a runner containing eight fast tests and an extended Playwright tier in the same Batch B. That sequence is not accepted literally.

The three browser tests are not yet a portable unit:

- `smoke_backup.js` and `smoke_recognition.js` contain fixed `/home/claude/apps-deploy/kanji-atlas` paths and fixed ports;
- Playwright/Chromium is not yet declared at the Atlas project root;
- browser ownership, port allocation, timeout policy, and dependency pinning require their own review.

Therefore this Batch B contains only the portable core runner. Browser-test modernization remains HOLD for a later contract.

## Allowed files

- new `kanji-atlas/_faz2/run-core-gates.mjs`
- one delivery report under `kanji-atlas/_AGENT_EXCHANGE/claude/reports/`
- optional evidence text files under `kanji-atlas/_AGENT_EXCHANGE/claude/evidence/2026-08-07-test-repair-b-core-runner/`

No existing test, application, manifest, audio, generated-data, package, lock, configuration, or documentation file may change.

## Exact whitelist

The runner must invoke exactly these ten files, in this order:

1. `smoke_content_scaffold.js`
2. `smoke_legacy_derived.js`
3. `smoke_durable_backend.js`
4. `smoke_game_roles.js`
5. `storage_check.js`
6. `srs_check.js`
7. `graph_check.js`
8. `list_progress_check.js`
9. `manifest_check.js`
10. `manifest_build_check.js`

The whitelist must be explicit in the runner. Do not discover tests by filename pattern or directory scan. In particular, never invoke `qa_kyuu_round.js`, `harness.js`, diagnostics, archived candidates, onboarding tests, or browser tests.

## Required behavior

### 1. Portable execution

- Use only Node built-ins; add no dependency or package file.
- Resolve test paths from the runner's own location, not the caller's current directory.
- Spawn every test with `process.execPath`; do not construct a shell command.
- The same command must work from repository root, `kanji-atlas/`, `_faz2/`, and an independently relocated checkout.

### 2. Deterministic supervision

- Run tests serially in the whitelist order.
- Capture each test's exit code or signal, duration, stdout, and stderr.
- Apply a documented per-test timeout appropriate for this fast tier; a timeout must terminate the child and fail the gate.
- Continue through the complete whitelist after an ordinary test failure so the final report shows every result.
- Runner/internal errors, spawn failures, signals, timeouts, or any non-zero child exit must make the runner exit non-zero.
- Do not start a server, bind a port, launch a browser, use the network, or write a tracked report.

### 3. Repository mutation guard

- When executed inside a Git worktree, record `git status --porcelain` before and after the suite.
- A release-gate run must start clean. If it starts dirty, refuse clearly before executing tests.
- If the status changes during execution, fail clearly and show the changed paths.
- The guard must be read-only: never reset, restore, clean, stash, or otherwise alter user work.
- If no Git worktree is available in an independently relocated copy, report the guard as unavailable rather than crashing; test execution must still work.

### 4. Human and machine output

- Default output: concise human-readable table or list with test name, PASS/FAIL/TIMEOUT, exit/signal, and duration, followed by totals and overall decision.
- `--json`: emit one valid JSON document to stdout, with no prose mixed into stdout. Captured child output may be represented as JSON fields. Diagnostics may use stderr.
- JSON must include at least: schema version, runner name, Node version, Git SHA when available, start/end timestamps, total duration, clean-tree guard result, ordered per-test results, totals, and overall pass boolean.
- Unknown arguments must fail with a usage message. `--help` must exit 0 without running tests.

## Required negative proofs

All destructive proofs must use temporary copies or temporary worktrees outside the repository. The delivered tree must remain clean.

Demonstrate independently that:

1. replacing one whitelisted test in a temporary copy with `process.exit(7)` makes the runner finish the remaining tests, report that test's exit 7, and exit non-zero;
2. replacing one whitelisted test with a process that exceeds the timeout produces TIMEOUT, terminates the child, and makes the runner exit non-zero;
3. a temporary committed fixture that mutates a tracked file during its run is detected by the after-status guard and makes the runner exit non-zero without automatically reverting the mutation;
4. starting the runner in an already dirty temporary Git worktree refuses before executing any test;
5. `--json` output parses successfully as JSON for both a passing suite and a failing temporary fixture.

Restore or discard only the temporary fixtures after capturing evidence. Never run a mutating fixture against the working project.

## Out of scope

- Playwright, Chromium, browser tests, HTTP servers, and port management
- `package.json`, lockfiles, dependency installation, or CI configuration
- Editing any of the ten tests
- Onboarding test repair
- Test renames, moves, or archival work
- Diagnostics or historical tools
- Product, content, accessibility, native, store, merge-to-main, or deploy work

## Acceptance criteria

- One new dependency-free runner invokes exactly the ten approved files in order.
- A clean positive run reports 10/10 PASS and exits 0 on Claude's environment.
- Codex reproduces 10/10 PASS on the actual external project volume.
- Commands from four required working directories/locations behave consistently.
- Failure, timeout, mutation, dirty-start, and JSON proofs behave as specified.
- Existing tracked files are byte-identical to the starting commit.
- Only allowed files change.
- Delivery report includes contract hash, base/tip SHA, changed-file list, raw commands, exit codes, runtime/tool versions, rollback point, and final clean status.
- Delivery is supplied as a Git bundle if Claude cannot push its branch.

Batch B remains open until Codex independently reviews the bundle and runs the positive and selected negative proofs.
