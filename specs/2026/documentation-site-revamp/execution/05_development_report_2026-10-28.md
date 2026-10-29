# Development report: documentation site revamp

## Executive summary

Forge implemented the approved documentation-site revamp on
`feature/documentation-site-revamp`, based on the post-ads-merge `master`
revision `54e9a06d9ee86874b5c4cf40f7e0d3ce1a67e6ed`. The delivery adds a shared
documentation shell, a professional home and catalog index, four dedicated
static guides, route metadata, the requested local NMI logo and GMA New Media
favicon, updated consumer
documentation, and expanded browser coverage. Published package behavior and
version metadata were not changed.

## Workflow context

- Requirements approval: APR-002, user decision “Proceed”.
- Development approval: APR-003, user decision “Proceed”.
- Brand-asset refinement: APR-004, user request for the supplied NMI logo and
  replacement favicon followed by “Please continue”.
- Approved units: U-001 through U-004.
- Current endpoint: validated, independently reviewed PR handoff; Git actions
  remain separately gated.

## Previous stage summary

Athena prepared requirements, acceptance criteria, design, NFRs, WBS, test plan,
and initial setup. The ads documentation branch subsequently merged to `master`;
the dedicated documentation branch was advanced to that merged revision before
implementation continued.

## Execution details

### U-001: shell and catalog model

- Added `app/documentation-shell.tsx` with skip link, branded header, primary and
  footer navigation.
- Added `app/catalog/component-guides.ts` as the typed inventory/content source
  for all four entries.
- Rebuilt the documentation design system in `app/globals.css` with responsive,
  reduced-motion, focus, code, card, catalog, and guide styles.

### U-002: pages and guides

- Revamped `app/page.tsx` and converted `app/catalog/page.tsx` into an index.
- Added `app/catalog/[slug]/page.tsx` with `generateStaticParams`,
  `dynamicParams = false`, route metadata, entry-specific previews, and the
  required install/setup/configuration/operations sections.
- Updated preview-local labels and the Portal Header search action for the new
  stable guide routes.

### U-003: brand assets and metadata

- Replaced the temporary shell mark with the official NMI dark-background SVG,
  stored locally at `public/nmi-logo-dark-bg.svg` and rendered through
  `next/image` with `NEXT_PUBLIC_BASE_PATH` support.
- Replaced `app/favicon.ico` with the APR-004 GMA New Media ICO.
- Verified the exact downloaded assets: logo 7,102 bytes, SHA-256
  `B0014A90C9881B57811143A76BE85B94D8804F391914DEC2D45BDCFC26AB789F`;
  favicon 1,150 bytes, SHA-256
  `8CAA03F3E38F0FFC8C9C7B506B1A5773117D99418BC1A5098A45739B60F054FA`.
- Added distinct catalog/guide metadata and refined root metadata.

### U-004: tests and documentation

- Updated `tests/e2e/showcase.spec.ts` for the new routes, metadata/favicon,
  unknown-route behavior, responsive overflow, safe preview networks, keyboard
  flows, and retained component regressions.
- Updated `README.md` and `docs/consumer-setup.md` with the dedicated guide model.
- Added this linked spec/execution project to `specs/README.md`.

## Requirement-to-file mapping

| Requirements | Primary implementation files |
| --- | --- |
| R-001, R-002, R-005, R-008 | `app/page.tsx`, `app/catalog/page.tsx`, `app/documentation-shell.tsx`, `app/globals.css` |
| R-003, R-004, R-006, R-009 | `app/catalog/[slug]/page.tsx`, `app/catalog/component-guides.ts`, `app/layout.tsx` |
| R-007 | `app/favicon.ico` |
| R-013 | `public/nmi-logo-dark-bg.svg`, `app/documentation-shell.tsx`, `app/globals.css` |
| R-010 | `app/catalog/*-preview.tsx`, `tests/e2e/showcase.spec.ts` |
| R-011 | `README.md`, `docs/consumer-setup.md`, `tests/e2e/showcase.spec.ts` |
| R-012 | Git diff confirms no package runtime, export, version, lockfile, Storybook story, or changelog change. |

## Findings and deviations

- The working session resumed after the ads branch had merged to `master`.
  Re-basing the uncommitted delivery onto merged `master` satisfied the approved
  branch condition and preserved the new GPT consumer documentation.
- Initial browser verification found two test matchers that no longer expressed
  their intended scope and one coordinate assertion sensitive to CSS multicolumn
  browser geometry. These were corrected without changing package behavior;
  the full suite subsequently passed.
- APR-004 intentionally superseded the original favicon source and added the
  official NMI header logo. No other approved scope or design decision changed.
- Pre-existing untracked `.playwright-mcp/` remains untouched and out of scope.

## Risks

- Guide copy is maintained in a typed repository-local registry; future public
  components must add an entry and matching tests to avoid inventory drift.
- Owner aesthetic acceptance remains pending in manual QA.
- Storybook emits existing non-fatal Vite warnings about client directives,
  sourcemaps, output placement, and large chunks; the build exits successfully.

## Recommendation and approval status

Hand the complete dirty diff to Vera for verification. Implementation is within
APR-003. Commit, push, PR, merge, release, and deployment remain unauthorized.

## Next stage

Verification against AC-001 through AC-016, followed by independent review only
after all required manual cases pass.
