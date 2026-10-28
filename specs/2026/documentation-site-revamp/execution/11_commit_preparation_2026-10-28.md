# Commit preparation: documentation site revamp

## Repository and target

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch: `feature/documentation-site-revamp`.
- Current HEAD / reviewed base:
  `54e9a06d9ee86874b5c4cf40f7e0d3ce1a67e6ed`.
- Branch relationship: identical to local `master` before this commit (`0 0`).
- Proposed commit message: `feat: revamp documentation site`.
- Commit approval: pending. No file is staged by this preparation.

## Exact candidate files

Application and assets:

- `app/catalog/[slug]/page.tsx`
- `app/catalog/component-guides.ts`
- `app/catalog/google-analytics-preview.tsx`
- `app/catalog/page.tsx`
- `app/catalog/portal-header-preview.tsx`
- `app/documentation-shell.tsx`
- `app/favicon.ico`
- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `public/nmi-logo-dark-bg.svg`

Tests and consumer fixtures:

- `tests/consumers/ad-slot-typescript/main.tsx`
- `tests/consumers/google-analytics-typescript/main.ts`
- `tests/e2e/showcase.spec.ts`

Consumer/repository documentation:

- `README.md`
- `docs/consumer-setup.md`
- `specs/README.md`

Project records:

- `specs/2026/documentation-site-revamp/acceptance_criteria.md`
- `specs/2026/documentation-site-revamp/approvals.md`
- `specs/2026/documentation-site-revamp/design.md`
- `specs/2026/documentation-site-revamp/execution/05_development_report_2026-10-28.md`
- `specs/2026/documentation-site-revamp/execution/06_verification_report_2026-10-28.md`
- `specs/2026/documentation-site-revamp/execution/07_independent_review_report_2026-10-28.md`
- `specs/2026/documentation-site-revamp/execution/08_review_adjustment_plan_2026-10-28.md`
- `specs/2026/documentation-site-revamp/execution/09_adjustment_validation_report_2026-10-28.md`
- `specs/2026/documentation-site-revamp/execution/10_review_closure_report_2026-10-28.md`
- `specs/2026/documentation-site-revamp/execution/11_commit_preparation_2026-10-28.md`
- `specs/2026/documentation-site-revamp/initial_setup.md`
- `specs/2026/documentation-site-revamp/manual_testing.md`
- `specs/2026/documentation-site-revamp/nonfunctional_requirements.md`
- `specs/2026/documentation-site-revamp/repositories.md`
- `specs/2026/documentation-site-revamp/requirements.md`
- `specs/2026/documentation-site-revamp/specification.md`
- `specs/2026/documentation-site-revamp/state.md`
- `specs/2026/documentation-site-revamp/test_plan.md`
- `specs/2026/documentation-site-revamp/wbs.md`

The pre-existing untracked `.playwright-mcp/` directory is explicitly excluded.
No package source, package version, lockfile, changelog, component story, or
deployment workflow file is in the candidate.

## Validation and review evidence

- `npm run check`: PASS; size gates, lint, 9 test files / 73 unit tests, six
  consumer fixtures, Storybook, and Next production build.
- `npm run test:e2e`: PASS, final 48/48 desktop/mobile cases.
- Configured-base-path static export: PASS; home, docs, catalog, and four guide
  routes generated.
- Manual testing: MT-001 through MT-004 PASS; APR-005 records owner acceptance.
- Independent review: report 10 PROCEED; F-001 through F-003 closed with no new
  required finding.
- `git diff --check`: no content error; line-ending notices only.

## Approval boundaries

Commit approval will authorize staging only the files above and creating only
the proposed commit on the named branch. It will not authorize push, pull
request creation, merge, release, or deployment. Those actions remain separate
gates.
