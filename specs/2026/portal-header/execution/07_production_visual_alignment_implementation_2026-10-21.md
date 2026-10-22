# Development Report: Portal Header Production Visual Alignment

## Executive summary

PH-07 implements the PH-A12/PH-A13 revision that uses the live GMA News header
and supplied `header_style.css` as the visual and interaction baseline. The
component now renders a compact dark single bar, configurable section accent,
production-sized branding, desktop social/search/grid actions, and a responsive
full-width dropdown with mobile search/socials inside it. The implementation
retains the approved accessible React API and excludes the legacy stylesheet,
Fontello, remote fonts, jQuery, account/SSO, GA, and analytics.

## Context

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Base/HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with the shared uncommitted
  Portal Header candidate.
- Tracked binary diff hash after final PH-07 verification: `367919caf1bc896f7b079938a3ac2159dfbbf885`;
  untracked Portal Header source/evidence files remain listed by
  `git status --short` and the unrelated `.playwright-mcp/` directory remains
  excluded.
- Approval: PH-A10/PH-A11 as revised by PH-A12 requirements and PH-A13
  development approval.
- Role/stage: Forge / PH-07. No commit, push, PR, merge, release, or deployment.

## Reference evidence and decisions

Browser-computed production measurements recorded in `reference_analysis.md`
established approximately 51px desktop and 42px mobile heights, `#2e2e2e`
background, `#cc0001` News accent, 1195px centered inner width, 66x40 logo,
white 15px section label, desktop socials/search/grid actions, and a full-width
four/two-column responsive menu. Clean scoped CSS recreates that behavior; it
does not copy or load the mutable reference CSS at runtime.

## Requirement-to-file mapping

| Scope | Implementation |
| --- | --- |
| PH-R02 / PH-AC20 branding and accent | `types.ts`, `portal-header.tsx`, `styles.css`; optional `theme.accentColor`, production tokens, measured logo/label/action layout |
| PH-R03 / PH-AC04-PH-AC05 responsive menu | `portal-header.tsx`, `styles.css`; navigation moved out of persistent rows into an accessible full-width dropdown, four effective desktop columns and two mobile columns |
| PH-R04 search placement | Desktop compact search panel; mobile GET search inside the expanded dropdown; existing validation and URL safety retained |
| PH-R06 / PH-R10 exclusions | Existing local Font Awesome/logo implementation retained; no legacy stylesheet/JS, Fontello, remote font, SSO/account, GA, or analytics added |
| PH-R08 accessibility | Closed panel remains inert/hidden; focus entry/trap/return, Escape/outside close, labels, reduced-motion handling, and visible focus retained |
| PH-R11-PH-R12 documentation/tests | Unit tests, Storybook states, catalog, Playwright parity/overflow checks, README, consumer setup, migration guide, changelog, specs, and manual QA reference updated |

## Validation

| Command/check | Result |
| --- | --- |
| `npm run check` | PASS: typecheck, lint, 11/11 Vitest unit/a11y tests, 2/2 JS/TS consumer fixtures, Storybook build, Next.js 16 production build |
| `npm run test:e2e` | PASS: 22/22 configured Chromium desktop/mobile tests, including production structure and 320/375/768/1024/1440 overflow checks |
| `npm run pack:check` | PASS: 33 intentional files; 19.3 kB packed / 63.4 kB unpacked |
| `git diff --check` | PASS; only existing LF-to-CRLF working-copy notices |

Expected non-failing warnings remain the documented Storybook/Vite handling of
the package's preserved `"use client"` directive, Storybook documentation chunk
sizes, Node's `module.register()` deprecation, and Playwright color-environment
warning.

## Failures corrected during PH-07

- Three unit tests initially queried navigation while the newly inert closed
  dropdown correctly excluded it from the accessibility tree. The tests now
  open the menu before asserting navigation behavior; 11/11 pass.
- The initial 1195px inner-width rule could impose a flex min-content width on
  the constrained catalog preview. The component root now explicitly permits
  shrinking and uses `min(1195px, 96%)`; all viewport overflow checks pass.

## Risks and next action

The implementation checks are passing, but they are Forge evidence rather than
independent verification or review. PH-08 must revalidate the affected visual,
responsive, menu, search, accessibility, documentation, and packaging behavior.
The revised `manual_testing.md` still requires assigned human QA for visual
comparison, 200% zoom, keyboard/screen-reader/contrast checks, and the approved
latest-two Chrome/Edge/Firefox/Safari matrix. Only after required verification
passes may Atlas hand the exact candidate to Argus.
