# Verification audit: foundation baseline

## Context

- Date: 2026-10-09 Asia/Shanghai
- Role: Vera
- Repository / branch / revision: `D:\gno-node-projects\gno-shared-components-v2`, `master`, `c580e40819842932fe9430cefddca92bf6525867`
- Starting worktree: clean
- Environment: Windows, Node.js 26.10.0, npm 11.19.1
- Test oracle: foundation requirements, acceptance criteria, design, and test plan
- Manual QA reference: [`../manual_testing.md`](../manual_testing.md)

## Results

| Command / check | Expected | Actual | Status |
| --- | --- | --- | --- |
| `npm test` | Configured unit/component tests pass | Exit 0; Vitest 4.1.11 found 0 test files | PASS for command; coverage gap recorded |
| `npm run check` | Typecheck, lint, tests, package build, Storybook build, and Next.js build pass | Exit 0; all commands completed; Storybook found 0 story files; Next.js prerendered `/` and `/catalog` | PASS with coverage gaps |
| `npm run pack:check` | Publishable workspace dry run succeeds with documented files | Exit 0; `gno-shared-components@0.1.0`, 7 files, 1.4 kB packed / 2.6 kB unpacked | PASS |
| `npm audit` | No unaccepted high-severity advisory | Exit 1; 5 high-severity findings through `eslint-config-next` -> `@next/eslint-plugin-next` -> `fast-glob` -> `micromatch` -> `braces`; suggested force fix is breaking | FAIL |
| `npx playwright --version` | Installed CLI is runnable | Exit 0; Playwright 1.63.0 | PASS |
| `npx playwright install --list` | Required local browser binary is available | Exit 0; matching 1.63.0 Chromium/headless-shell and FFmpeg are installed; matching Firefox/WebKit are not listed | PASS for Chromium; N/A for unconfigured browsers |
| Playwright repository setup | Config and browser tests are discoverable | No Playwright config or test files; `npx playwright test --list` exited 1 with 0 tests | BLOCKED |
| Manual browser checks | Required cases executed | Three cases prepared; none executed | BLOCKED |

## Findings and disposition

1. The declared aggregate npm quality command currently passes.
2. There is no automated component behavior coverage: Vitest reports zero tests.
3. Storybook builds successfully but reports zero stories, consistent with the current empty public component inventory. AC-009 remains pending until a component exists.
4. Playwright and its matching Chromium binary are installed, but the repository has no Playwright test configuration or browser test suite. It cannot provide repeatable browser acceptance evidence in its current state.
5. The current dependency graph reports five high-severity advisories. No automatic fix was applied because npm proposes a breaking downgrade of `eslint-config-next`.

## Overall status and handoff

Baseline status at the time of this audit: **FAIL / BLOCKED**. The dependency security check failed, Playwright acceptance coverage was not configured, and required manual cases were unexecuted.

Atlas received this evidence. The security finding and Playwright coverage returned to the approved review-adjustment cycle.

## Post-adjustment verification update

A-006 approved the Playwright/hygiene corrections and a temporary exception for
the development-only advisory; A-007 approved the one-line mobile overflow
correction. Vera validated the resulting candidate on 2026-10-09. The full
commands, browser results, and current disposition are recorded in
[`10_adjustment_validation_2026-10-09.md`](10_adjustment_validation_2026-10-09.md).

Current verification status: **PASS for approved adjustments**. The shipped
dependency audit reports zero vulnerabilities, all six Playwright desktop/mobile
cases pass, restored ignore patterns match, and regression/build/package checks
pass. The unchanged five-advisory full development audit is covered by A-006 and
remains tracked for a later dependency refresh.
