# Codex Review — Test Repair Batch C

Date: 2026-08-07  
Executor: Claude  
Reviewer: Codex  
Reviewed delivery: `28e394db76d4ae48aba9c3e452c5b6991d782c8f`  
Decision: **FAIL — NARROW CORRECTION REQUIRED**

## Accepted findings

- The bundle is valid and begins at the required commit `f6567d5`.
- Changed paths are within the allowed Batch C scope.
- The package and lockfile pin Playwright `1.56.0` and declare a Node range covering Claude 22 and Codex 24.
- The runner uses an explicit three-test whitelist, loopback binding, port `0`, Node HTTP, serial child supervision, timeouts, JSON output, and read-only Git guards.
- The three tests no longer own Python servers, fixed ports, or Claude-only absolute paths.
- Product, core runner, manifest, audio, native, and onboarding files are unchanged.

These accepted findings are not yet sufficient to close Batch C.

## Blocking findings

### 1. Filesystem containment is lexical, not physical

`safeResolve()` checks that the lexically resolved path lies below the Atlas root, but `statSync`, `createReadStream`, and directory-index handling follow symbolic links. A symlink located inside Atlas can therefore point to a file or directory outside Atlas and the server can serve it.

This violates the contract requirement to serve only files inside the Atlas root. The existing traversal fixture exercises encoded `..` paths but does not exercise a symlink escape.

The server must verify physical containment using canonical/real paths for both the Atlas root and the requested target before returning content. Directory `index.html` resolution needs the same protection. Missing paths must remain normal 404 responses.

### 2. `smoke_sources.js` cleanup boundary starts too late

The file currently executes:

```js
const b = await chromium.launch(...);
const p = await b.newPage();
try {
```

If `newPage()` throws after Chromium launches, execution never enters the `try/finally` that closes `b`. This does not meet the required cleanup guarantee for failure paths.

The browser must be covered by cleanup immediately after it is successfully created. Do not change assertions or selectors.

### 3. Delivered diff is not whitespace-clean

`git diff --check f6567d5..28e394d` reports trailing whitespace in:

`kanji-atlas/_AGENT_EXCHANGE/claude/evidence/2026-08-07-test-repair-c-browser-gates/tool-versions.txt`

The correction must leave `git diff --check` clean.

## Decision

Mac dependency installation and the approximately four-minute real Chromium suite are deferred until these structural blockers are corrected. This avoids approving a green run for infrastructure that does not yet satisfy its security and cleanup contract.

- Batch C: **FAIL / correction pending**
- Later test work: **HOLD**
- Web release: **HOLD**

