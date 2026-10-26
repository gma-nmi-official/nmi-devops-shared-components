# Implementation Report: Portal Header Review Adjustments

## Result

Forge completed the PH-A22-approved corrections for ARG-PH-01 through
ARG-PH-03. The default production appearance is unchanged, the documented
component-root text-token override is effective across visible header content,
the asset record matches the implemented package, and the unrelated unused
global muted token is absent. Configured implementation checks pass; Vera
revalidation and Argus review closure remain pending.

## Context and authorization

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Base HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with the existing dirty Portal
  Header candidate.
- Authorization: PH-A22, approving report 12 only for ARG-PH-01 through
  ARG-PH-03.
- Boundaries preserved: navigation, social presets, search, public props,
  production dimensions, logo artwork, and menu behavior are unchanged.
  `.playwright-mcp/` and `specs/2026/public-storybook-documentation/` remain
  excluded from this delivery.

## Implementation

| Finding | Correction | Requirement/evidence link |
| --- | --- | --- |
| ARG-PH-01 | Section labels, navigation links, action buttons, and social links now consume `--gno-portal-header-text`. Package guidance identifies `.gno-portal-header` as the supported override location and explains why an ancestor-only value does not replace component defaults. | PH-R02; PH-AC02; package README |
| ARG-PH-01 | Added a computed-style Playwright regression covering default white and a component-root override on the section label, menu control, social link, and navigation link in desktop/mobile projects. | PH-AC02; `tests/e2e/showcase.spec.ts` |
| ARG-PH-02 | Updated the logo inventory to record the repository source, embedded default, package export, matching SHA-256, and completed packaged status. | PH-AC18; `asset_inventory.md` |
| ARG-PH-03 | Removed the unused `--gno-color-muted` global-token edit from the candidate. References remain only in approval/review history. | PH-A22; report 11 |
| Delivery record | Updated the changelog to describe the corrected public token contract and the current configured-browser count. | PH-R12; PH-AC18 |

## Validation evidence

| Command/check | Result |
| --- | --- |
| Focused Playwright text-token regression | PASS, 2/2 configured desktop/mobile cases |
| `npm run check` | PASS: typecheck, lint, 13/13 unit/accessibility tests, 2 consumer fixtures, package build, Storybook build, and Next.js 16.3.8 build |
| `npm run test:e2e` | PASS, 28/28 configured Chromium desktop/mobile cases |
| `npm run pack:check` | PASS, 37 files; 21.7 kB package, 76.6 kB unpacked; exported logo and notices included |
| Logo source SHA-256 | PASS, `4265686660c12d10f6954d8dec60884933d680f10dd79a4ff7a76c016d62f39a` |
| Unused-token scan | PASS: `--gno-color-muted` appears only in approval/review history and not in implementation |
| `git diff --check` | PASS; only existing LF-to-CRLF notices |

Expected non-failing warnings remained limited to bundler handling of
`"use client"`, Storybook chunk sizing, the Node `module.register`
deprecation, Playwright `FORCE_COLOR`, and Git line-ending notices. The initial
sandboxed `npm run check` and `npm run pack:check` attempts could not spawn or
write to the user npm cache; the same commands passed outside the restricted
sandbox.

## Risks and remaining work

- PH-A20's screen-reader waiver and PH-A21's deferred Firefox/Safari/second-
  version coverage remain unchanged accepted risks.
- Forge evidence is not independent validation. Vera must re-run the focused
  and full affected checks against this dirty candidate.
- Argus must independently confirm ARG-PH-01 through ARG-PH-03 are closed.
- No staging, commit, push, pull request, release, merge, or deployment action
  has been performed or authorized.

## Handoff

Next owner: Vera. Revalidate the corrected candidate against report 12 and
PH-A22, then hand passing evidence to Argus for review closure.
