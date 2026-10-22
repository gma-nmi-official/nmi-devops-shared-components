# Verification Report: Portal Header PH-10

## Executive summary

Vera independently revalidated the dirty Portal Header candidate after
PH-A14 through PH-A18. The configured automated candidate is **PASS**: the full
quality gate, 22 Chromium desktop/mobile acceptance cases, package inspection,
and targeted source/built-output scans pass. The exact 16-link GMA preset and
layout, responsive overflow checks at 320/375/768/1024/1440 CSS px, mobile
last-link reachability, and the nine-solid-square menu glyph in closed and
expanded states are covered.

Overall PH-10 is **PARTIAL/BLOCKED**, not release- or commit-ready. Required
human 200% zoom, keyboard/screen-reader/contrast checks and the latest-two stable
Chrome, Edge, Firefox, and native Safari matrix remain unexecuted. No product
failure was found in this iteration.

## Context and candidate identity

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch/HEAD: `feature/portal-header` /
  `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with the shared uncommitted Portal
  Header candidate.
- Tracked candidate diff hash excluding PH-10 evidence/state/manual records:
  `32e763ad25fa82e74a9a0b8cf28d24f231cca1ca`.
- Untracked implementation, test, documentation, and evidence files are
  identified by `git status --short`; `.playwright-mcp/` remains excluded and
  untouched.
- Oracle: approved requirements/design and PH-AC01 through PH-AC22, including
  PH-A14/PH-A15 navigation and PH-A16/PH-A17/PH-A18 glyph decisions.
- Previous implementation evidence: report 09. Previous Vera evidence: reports
  06 and 06b.
- Role/stage: Vera / PH-10. Vera changed only this report, `../manual_testing.md`,
  and `../state.md`; no application/package implementation was changed.

## Environment

- Windows NT `10.0.26200.0`; PowerShell `7.6.6`.
- Node.js `v26.10.0`; npm `11.19.1`; Playwright `1.63.0`.
- Data and endpoints: repository fixtures, generated package output, and the
  local Playwright web server only. No credentials, production writes, or
  external-link activation were used.

## Commands and results

| Command/check | Expected | Actual | Status |
| --- | --- | --- | --- |
| `npm run check` in the restricted sandbox | Full quality gate starts | Typecheck and lint passed; Vitest startup was prevented by sandbox `spawn EPERM` when esbuild attempted its required child process | BLOCKED environment attempt; rerun below |
| `npm run check` with approved execution permission | Typecheck, lint, unit/a11y, JS/TS fixtures, Storybook, and Next production build pass | Exit 0; 13/13 Vitest tests, 2/2 consumer fixtures, Storybook build, and Next.js static production build passed | PASS |
| `npm run test:e2e` with approved execution permission | Configured desktop/mobile browser acceptance and regressions pass | Exit 0; 22/22 Chromium desktop/mobile tests passed; no collected console/page errors | PASS |
| `npm run pack:check` in the restricted sandbox | Inspect intended package | npm cache access was prevented by sandbox `EPERM` | BLOCKED environment attempt; rerun below |
| `npm run pack:check` with approved execution permission | Package inventory contains public runtime, declarations, CSS, logo, notices, and intended files | Exit 0; 37 files, 21.4 kB packed, 75.5 kB unpacked | PASS |
| `git diff --check` | No whitespace errors | Exit 0; only LF-to-CRLF working-copy notices | PASS |
| Source and built-output prohibited-runtime scan | No GA/analytics, legacy script/style, jQuery, unsafe HTML/eval, Fontello/Glyphicon/Bootstrap, remote font/icon/CSS, or package-private/Next import coupling | No matches in `packages/ui/src` and `packages/ui/dist` (source maps excluded); consumer fixtures contain no package-private/Next import | PASS |
| Public API/story/catalog inspection | Required exports, CSS/asset exports, controls, states, guidance, migration, and changelog are present | Export/type/package and story/catalog inventories match PH-R01/PH-R11/PH-R12 | PASS |

The passing reruns classify both initial `EPERM` results as sandbox restrictions,
not candidate defects. Expected non-failing warnings remain the Vite/consumer
bundler handling of `"use client"`, Storybook chunk sizes, Node
`module.register()` deprecation, and Playwright color-environment warning.

## Targeted navigation, layout, and glyph evidence

- Source and generated output contain the 4 primary plus 12 network destinations
  in the approved order and with the approved HTTPS URLs.
- Unit/API coverage and source inspection verify the immutable default preset,
  `none`, same-ID replacement without movement, hidden defaults, and appended
  IDs.
- Playwright asserts 16 rendered navigation anchors, their complete label order
  and each exact URL. At desktop width every anchor is visible; the layout is one
  primary column plus three top-to-bottom network columns. At 375px both lists
  use two columns and `GMA Now` is reachable by panel scrolling.
- Playwright reports no page-level horizontal overflow at 320, 375, 768, 1024,
  and 1440 CSS px. It also verifies the approximately 51px desktop and 42px
  mobile bars, 66x40 logo, desktop/mobile action changes, and full-width menu.
- Source and built output generate exactly nine `5x5` rectangles at positions
  `[1, 8, 15]` in a `21x21` SVG. Browser assertions confirm nine rectangles,
  `fill="currentColor"`, no `stroke`, visibility before menu opening, and
  visibility after expansion. Static scans confirm no legacy icon-font runtime.

These results establish configured responsive behavior. They do not substitute
for the still-required human 200% zoom or native-browser visual matrix.

## Acceptance mapping

| Criterion | Status | Evidence / limitation |
| --- | --- | --- |
| PH-AC01-PH-AC03 | PASS | Public runtime/types/CSS/assets package correctly; local branding and safe current/disabled/external/new-tab navigation pass unit, fixture, package, and static checks |
| PH-AC04 | BLOCKED | Automated menu state, Escape, focus restoration/trap, and closed-content isolation pass; required independent human keyboard/outside-close execution remains unrun |
| PH-AC05 | BLOCKED | Five-width overflow, desktop 1+3 layout, mobile two-column layout, and last-link reachability pass; required 200% zoom and human long-label/native-browser presentation remain unrun |
| PH-AC06-PH-AC09 | PASS | Search, social presets/patches/safety, analytics independence, anchor fallback, consumer adapter, and builds pass |
| PH-AC10 | BLOCKED | Automated axe serious/critical scope passes; human keyboard, screen-reader, contrast, forced-colors, and reduced-motion checks remain unrun |
| PH-AC11-PH-AC18 | PASS | SSR/static build, runtime independence, stories/catalog, all configured quality gates, both consumer fixtures, migration guide, and changelog pass inspection |
| PH-AC19 | N/A for PH-10 | Exact-revision GitHub Actions publication is a later separately approved release gate; no commit/tag/release action is authorized |
| PH-AC20 | BLOCKED | Chromium computed dimensions/structure pass; independent human comparison across the required native-browser matrix remains unrun |
| PH-AC21 | PASS | Exact 16-label/URL/DOM order, patch semantics, 1+3 desktop columns, two-column mobile presentation, and reachability pass |
| PH-AC22 | BLOCKED | DOM/count/fill/no-stroke/state/size and no-font-runtime checks pass; required independent human visual comparison remains unrun |

## Manual/browser handoff

The standalone QA reference is [`../manual_testing.md`](../manual_testing.md).
It retains 8 required cases: 0 PASS, 0 human-execution FAIL, 8 BLOCKED, and 0
N/A. The Portal Header QA/accessibility owner remains pending assignment. The
handoff is prepared, not sent or executed. Required remaining evidence includes
200% zoom, keyboard/pointer, screen-reader, contrast/forced-colors/reduced-motion,
and both latest stable versions of Chrome, Edge, Firefox, and Safari on suitable
native infrastructure.

## Conclusion and next action

- Configured automated/static verification: **PASS**.
- Open product defects: **none found**.
- Overall verification: **PARTIAL/BLOCKED** due only to unexecuted required
  human/native-browser cases.
- Next owner/action: Atlas assigns the QA/accessibility owner and coordinates
  PH-MT01 through PH-MT08 on this exact candidate. Vera then refreshes the
  results. A fully passing candidate can be handed to Argus for independent
  review.
- No Git staging, commit, push, PR, merge, release, or deployment was performed
  or authorized.
