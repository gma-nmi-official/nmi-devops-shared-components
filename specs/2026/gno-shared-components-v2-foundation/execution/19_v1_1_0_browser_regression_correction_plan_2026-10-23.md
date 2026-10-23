# v1.1.0 browser regression correction plan

## Context

- Release candidate: `feature/release-v1.1.0` at base
  `d91ac862dda90073875d16c70bb24886d334ff98`.
- Trigger: the required `npm run test:e2e` release gate completed with 21 of
  28 tests passing and seven failures.
- Attribution: the release candidate changes only the displayed version under
  `app/` and does not modify Portal Header source or the existing browser tests.
  The failures expose integration drift already present in the merged public
  documentation revision.
- Pages deployment: GitHub Actions run `39879895039` passed on the same remote
  `master` revision after Pages was enabled.

## Findings

1. The landing-page navigation test still expects the superseded foundation
   heading and link labels instead of the merged public-documentation page.
2. URL assertions reject the configured `trailingSlash: true` behavior even
   though `/catalog/` is the intended production URL.
3. The mobile documentation home overflows at 375 px because the quick-start
   code sample retains its intrinsic no-wrap width inside a grid child.
4. The broad `.catalog__section a` documentation selector has greater
   specificity than Portal Header's packaged link styles and changes visible
   social links from the component text token to documentation blue.

## Proposed correction unit

This is a compact pre-release integration fix. No component API, defaults,
navigation data, or Storybook story behavior changes.

| File | Proposed change |
| --- | --- |
| `app/globals.css` | Constrain documentation link styling so it does not apply inside the Portal Header preview; allow the quick-start code block/grid child to shrink or scroll without page overflow. |
| `tests/e2e/showcase.spec.ts` | Align landing-page assertions with the merged public documentation content and accept the repository's configured trailing-slash URLs while preserving the existing navigation, accessibility, search, token, and overflow coverage. |
| Release evidence files | Record execution, browser results, and final readiness without rewriting prior failure history. |

## Acceptance criteria

- The public documentation landing page has no horizontal overflow at 375 px.
- Catalog documentation styles do not override Portal Header social or
  navigation text tokens.
- Browser tests assert the current landing-page journey and configured URL
  contract rather than superseded content.
- `npm run check`, `npm run test:e2e`, `npm run pack:check`, both dependency
  audits, and `git diff --check` complete with the documented development-only
  ESLint advisory exception unchanged.
- Independent review is completed before commit approval is requested.

## Approval boundary

Development approval is required before modifying the CSS or browser tests.
That approval does not authorize commit, push, PR, merge, tag creation/push,
GitHub Release publication, or deployment.

## Implementation and validation result

- Approval: A-025, user decision `Please proceed`, 2026-10-23 Asia/Shanghai.
- `app/globals.css`: limited catalog link styling to documentation-owned direct
  content and made the quick-start code block shrinkable and horizontally
  scrollable within its grid cell.
- `tests/e2e/showcase.spec.ts`: updated the navigation journey to current public
  documentation headings, labels, and title; accepted the configured optional
  trailing slash without weakening search-query assertions.
- Component source, public API, defaults, navigation data, and Storybook stories
  were unchanged.

| Check | Result | Evidence |
| --- | --- | --- |
| `npm run test:e2e` | PASS | 28/28 Chromium desktop/mobile cases passed in 57.6 seconds. |
| `npm run check` | PASS | Typecheck, lint, 13 unit tests, two consumer fixtures, Storybook 10.6.3, and Next.js 16.4.2 production build passed. |
| `npm audit --omit=dev --json` | PASS | Zero runtime findings. |
| `npm audit --json` | PASS WITH ACCEPTED EXCEPTION | Five high findings remain only in the A-006 development-only ESLint globbing chain; no new advisory family was introduced. |
| `npm run pack:check` | PASS | `nmi-devops-shared-components@1.1.0`, matching tarball, 37 files. |
| Version parse | PASS | Root, publishable package, lock root, and lock workspace all equal `1.1.0`. |
| `git diff --check` | PASS | No whitespace errors. |

Vera handoff result: PASS for the approved correction unit and relevant
regressions. Independent Argus or human review remains required before the
commit gate; this implementer/validator does not claim independent review.
