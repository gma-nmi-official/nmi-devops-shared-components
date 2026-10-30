# Portal Header PR #23 code review adjustments

## Scope

This follow-up addresses the re-review comment on PR #23 at
`https://github.com/gma-nmi-official/nmi-devops-shared-components/pull/23#issuecomment-6509340969`.
The reviewed implementation is based on commit `e1ec58f` on
`feature/portal-header-review-adjustments-v2`.

- CR-004: narrow the adapter fallback contract to client rendering and document
  that adapters must remain safe during SSR.
- CR-005: complete the remaining resolver readability cleanup as an optional
  accepted item.
- CR-008: move the PortalHeader follow-up changelog entry from released
  `[1.4.1]` to `[Unreleased]` with Patch impact.
- CR-009: synchronize the current state record with committed HEAD and the new
  review stage.
- CR-010: reset the link error boundary after a healthy adapter element is
  supplied and add a recovery regression test.

## Status

CR-004, CR-008, CR-009, and CR-010 are required corrections. CR-005 is an
optional readability item and is accepted in this adjustment so the resolver
files have no remaining compressed control-flow forms in scope.

## Validation

- PortalHeader focused unit/accessibility suite: 19/19 passed.
- Full Vitest suite: 89/89 passed across 9 test files.
- Typecheck and package build: passed.
- Consumer fixtures: 6/6 passed.
- Storybook build, coverage, catalog documentation, and Next production build:
  passed.
- Targeted Portal Header Playwright suite: 22/22 passed across desktop/mobile
  and the 320/375/768/1024/1440px overflow matrix.
- Targeted ESLint and `git diff --check`: passed.
- SSR regression now explicitly pins the documented limitation: error boundaries
  do not catch a throwing adapter element during server rendering.

Build output contains the repository's existing sourcemap, `use client`, public
directory, and chunk-size warnings; all commands exited successfully.

Independent Argus review: **PROCEED**. CR-004, CR-008, CR-009, and CR-010 are
resolved; CR-005 is accepted optional readability cleanup with no remaining
required finding.

## Delivery

This is a follow-up to the open PR #23. Commit, push, merge, release, and
deployment remain separately gated. The user-owned `.playwright-mcp/` files
remain excluded.
