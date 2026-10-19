# Review adjustment plan: Bitbucket handoff readiness

> Historical plan from 2026-10-09 for the then-approved Bitbucket target. The active package release process now uses GitHub Releases; this completed plan is retained as history.

## Objective

Resolve Argus findings F-003 and F-005 through F-007, establish a reviewable commit candidate, and prepare the exact `master` push to the empty Bitbucket repository.

## Proposed corrections

1. **Repository hygiene (F-003).** Add `/out/`, `/build/`, `.vercel/`, and `*.pem` to `.gitignore`. Validate each pattern with `git check-ignore -v` using safe representative paths.
2. **Current-state reconciliation (F-005).** Update `state.md` to reflect the actual revision and dirty files, completed earlier adjustment history, current empty component inventory, A-004 commit approval, pending post-commit push approval, HTTP Bitbucket origin, current verification disposition, and next action. Preserve historical GitHub and HTTPS attempts as history rather than current state.
3. **Security disposition (F-006).** Record that the five high findings are confined to development lint tooling, that the shipped dependency audit passes with zero findings, and that the vulnerable `braces` version has no fixed npm release. Treat the full audit as an approved temporary development-tooling exception, retain `npm audit --omit=dev --audit-level=high` as the release check, and track the upstream fix for a later dependency refresh.
4. **Browser evidence (F-006).** Add a minimal Playwright Chromium configuration and browser tests for `/` and `/catalog`, navigation, keyboard focus, console errors, and desktop/mobile overflow. Run the suite and update `manual_testing.md` and the verification report with actual results. No component API or public package export changes are included.
5. **Regression validation.** Run `npm run check`, `npm run pack:check`, `npm audit --omit=dev --audit-level=high`, the new Playwright suite, `.gitignore` checks, and `git diff --check`. Update evidence with exact results.
6. **Independent closure.** Return the final diff and results to Argus. Required findings must be closed before commit.
7. **Delivery.** Commit only the reviewed files with `docs: record verification and bitbucket handoff` unless the final scope includes test/tooling files, in which case use `test: add browser verification for bitbucket handoff`. After the commit exists, present its exact hash/message/files and `git push origin master`, then obtain the required final push approval for that concrete artifact.

## Scope and impact

- Expected files: `.gitignore`, Playwright configuration/tests and supporting npm script if required, foundation `state.md`, `approvals.md`, `manual_testing.md`, verification/review/adjustment reports, and lockfile only if the approved test setup requires it.
- Application runtime and public package API: unchanged.
- Bitbucket target: `origin/master` at the user-requested HTTP URL.
- Rollback: revert the local correction diff before commit, or create a normal revert after commit; no force push is planned.

## Browser-validation discovery and amendment request

The implemented browser suite passes five of six cases. At a 375 px viewport,
`/catalog` has page-level horizontal overflow: document width is 1,010 px while
the viewport is 375 px. The long code sample correctly has internal scrolling,
but the grid item's automatic minimum width expands the page.

A one-off production-browser probe confirmed that the single rule
`.catalog__empty { min-width: 0; }` changes the document measurement to 375/375
while preserving internal code-block scrolling (`scrollWidth` 912 px inside a
277 px code block). Adding `max-width` to the code block is unnecessary.

Because the approved plan stated that application runtime would remain unchanged,
editing `app/globals.css` requires an explicit scope amendment. If approved, Forge
will add only `min-width: 0` to `.catalog__empty`, rerun the complete E2E suite,
and include the result in Vera and Argus handoffs.

## Approval required

AGENTS core rule 8 requires explicit review-adjustment approval before these corrections are implemented. Approval also accepts the documented temporary development-tooling audit exception. Commit and push remain separately gated by final passing evidence and the concrete post-commit push summary.
