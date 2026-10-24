# Development Report: Logo and Section-Label Optical Alignment

## Executive summary

PH-10a corrects the visual misalignment reported under PH-A19. The live GMA
News header does not mathematically center the `News` label against the complete
antenna-inclusive SVG box. Its label center is approximately `5px` lower at
both desktop and `375px` widths, aligning the text with the visible blue GMA
wordmark. The package now reproduces that optical offset without changing the
logo, header dimensions, public API, or responsive breakpoint.

## Context and scope

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Base/HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with the shared dirty
  Portal Header candidate.
- Candidate tracked diff reference excluding this report:
  `a82a51721011424317e5e5b9aee7f4ae0a871237`.
- Approval: PH-A19, within the existing PH-A12 production-visual baseline.
- Role/stage: Forge / PH-10a. No Git delivery or release action was performed.

## Reference and implementation

Browser inspection of `https://www.gmanetwork.com/news/` measured the production
`66x40` logo and label at desktop and `375px`. In both cases, the label center
was approximately `5px` below the logo image-box center. This is intentional
optical alignment because the SVG's antenna occupies space above the blue
wordmark.

| Concern | Change |
| --- | --- |
| Package styling | `packages/ui/src/styles.css` applies a logical `5px` block-start offset to the section label |
| Browser regression | `tests/e2e/showcase.spec.ts` asserts the `5px` center difference at `1440px` and `375px` |
| Storybook | The dedicated Desktop story asserts the measured optical offset |
| Consumer guidance | Catalog and changelog describe the production-compatible alignment |
| Traceability | PH-A19, PH-AC20, reference analysis, test plan, manual QA, requirements/design/WBS, and state are refreshed |

## Validation

| Check | Result |
| --- | --- |
| `npm run build:package` | PASS; corrected CSS copied to the distributable package |
| `npm run lint` | PASS |
| Focused Playwright production-visual test | PASS, 2/2 configured desktop/mobile projects |
| Local computed geometry | PASS; logo `66x40`, label center offset exactly `5px`, computed block-start inset `5px` |
| Local visual capture | `.playwright-mcp/portal-header-logo-alignment-2026-10-21.png` |
| `npm run check` | PASS; typecheck, lint, 13/13 unit/a11y tests, 2/2 consumer fixtures, Storybook, and Next.js 16 production build |
| `npm run test:e2e` | PASS, 22/22 configured Chromium desktop/mobile tests |
| `npm run pack:check` | PASS; 37 files, 21.4 kB packed / 75.6 kB unpacked |
| `git diff --check` | PASS; only expected LF-to-CRLF working-copy notices |

Expected non-failing Vite/consumer handling of the preserved `"use client"`
directive, Storybook chunk-size warnings, Node `module.register()` deprecation,
and Playwright color-environment warnings remain unchanged.

## Risk and handoff

The offset is scoped to the section label, uses logical positioning, and leaves
layout allocation and header dimensions unchanged. Forge evidence is not
independent verification. Vera must revalidate the affected PH-AC20 visual and
responsive evidence. The existing PH-MT01-PH-MT08 human/native-browser blockers
also remain; this correction does not claim those checks passed.
