# Development Report: Complete Ordered Navigation and Menu Grid

## Executive summary

PH-09 implements PH-A14 through PH-A18. `PortalHeader` now defaults to all 16
verified GMA production destinations in exact reference DOM order, supports
stable-ID override/hide/append behavior, lays the desktop dropdown out as one
primary plus three top-to-bottom network columns, and keeps all links reachable
in the two-column mobile panel. The rounded Font Awesome grip is replaced by a
local nine-solid-square SVG matching the live menu-grid glyph without loading
Fontello, Bootstrap, or a remote font.

## Context

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Base/HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with the shared uncommitted
  Portal Header candidate.
- Tracked binary diff reference after PH-09: `a964bfc1e93dc1899b4beaf3e93dcb152d16adf5`.
  New Portal Header source/evidence files remain untracked and are identified by
  `git status --short`; the unrelated `.playwright-mcp/` directory remains
  excluded.
- Approval: PH-A14 requirements/PH-A15 development for navigation; PH-A16
  requirements/PH-A17 development for the menu-grid replacement; PH-A18
  corrects the cell fill based on the user's larger comparison screenshots.
- Role/stage: Forge / PH-09. No commit, push, PR, merge, release, or deployment.

## Verified reference

Live DOM inspection on 2026-10-21 confirmed four primary and twelve network
anchors and their HTTPS destinations. The menu trigger is
`<span class="glyph-icon icon-menu-grid">`, computed from Fontello `U+E836` at
21px; it is not Bootstrap `glyphicon-th`. A direct screenshot comparison was
performed between the live glyph and the local inline SVG. The user's larger
comparison then established that each cell is a solid white square separated by
dark spacing, correcting the initial outlined-cell interpretation. Only that
nine-square appearance is reproduced; the legacy font/runtime is not copied.

## Requirement-to-file mapping

| Scope | Implementation |
| --- | --- |
| PH-R02 / PH-AC21 defaults and patching | `navigation-links.ts`, `types.ts`, public exports; immutable `gma`/`none` presets and deterministic group-specific stable-ID patches |
| PH-R03 / PH-AC05 / PH-AC21 layout and reachability | `portal-header.tsx`, `styles.css`; one primary + three top-to-bottom network columns, two mobile columns, bounded scrolling |
| PH-R02 / PH-R03 / PH-R10 / PH-AC22 glyph | `icons.tsx`, `portal-header.tsx`; nine solid-square local SVG cells replace `faGrip`, with no icon font |
| PH-R11-PH-R12 evidence and guidance | Unit tests, Storybook controls/states, catalog, Playwright, README, consumer setup, migration guide, changelog, specs, and manual QA reference |

## Validation

| Command/check | Result |
| --- | --- |
| `npm run check` | PASS: typecheck, lint, 13/13 Vitest unit/a11y tests, 2/2 JS/TS consumer fixtures, Storybook build, Next.js 16 production build |
| `npm run test:e2e` | PASS: 22/22 configured Chromium desktop/mobile tests; asserts 16 labels, exact URLs, DOM order, desktop visibility, mobile last-link scroll reachability, column progression/count, nine SVG cells in closed/expanded states, focus/search behavior, and five overflow widths |
| `npm run pack:check` | PASS: 37 intentional files; 21.4 kB packed / 75.5 kB unpacked |
| `npm run lint` | PASS after final E2E copy assertion update |
| `git diff --check` | PASS; only LF-to-CRLF working-copy notices |
| Direct live/local glyph inspection | PH-A18 correction applied from the user's local/actual screenshots: solid 3-by-3 square silhouette and production-sized control; formal human visual acceptance remains pending |

Expected non-failing warnings remain the documented Storybook/Vite handling of
the preserved `"use client"` directive, Storybook chunk sizes, Node
`module.register()` deprecation, and Playwright color-environment warning.

## Failures corrected during PH-09

- A unit assertion initially treated the section-label text `Entertainment` as
  unique after the same label became a default navigation entry. It now scopes
  the assertion to the section-label element; 13/13 tests pass.
- The first final Playwright run retained an old catalog-copy substring after
  documentation was expanded. The assertion now targets the approved complete
  navigation wording; 22/22 tests pass.
- One full-gate attempt observed a transient stale generated root export while
  an existing development server was active. A clean package rebuild restored
  the expected export; both consumer fixtures and the subsequent complete
  `npm run check` pass. No source export defect was reproducible.

## Risks and next action

Forge evidence is not independent verification. PH-10 must revalidate PH-AC01
through PH-AC22, especially default navigation patch semantics, visual ordering,
short-viewport scrolling, and the menu-grid appearance. The revised
`manual_testing.md` still requires assigned human QA for visual comparison,
200% zoom, keyboard/screen-reader/contrast checks, and the approved latest-two
Chrome/Edge/Firefox/Safari matrix. Passing evidence may then be handed to Argus.
