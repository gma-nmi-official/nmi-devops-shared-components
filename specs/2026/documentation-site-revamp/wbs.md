# Delivery units and work breakdown: documentation site revamp

| Unit | Work item | Requirements / acceptance criteria | Repository | Dependencies | Owner | Definition of done | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| U-001 | Documentation shell, design tokens, and typed guide registry | R-001, R-002, R-006, R-008 / AC-001–AC-003, AC-008, AC-010–AC-011 | gno-shared-components-v2 | Approved requirements/design; dedicated branch | Forge | Shared shell and registry typecheck; responsive structure and inventory are usable without new runtime dependencies. | Complete |
| U-002 | Revamped `/`, `/catalog`, and four static guide routes with local previews | R-001–R-006, R-010 / AC-001–AC-008, AC-013 | gno-shared-components-v2 | U-001 | Forge | All routes render approved content, static params cover exactly four slugs, Storybook links work, and safe previews retain intended behavior. | Complete |
| U-003 | Brand assets and route metadata | R-007, R-009, R-013 / AC-009, AC-012, AC-016 | gno-shared-components-v2 | U-001 | Forge | Approved logo and favicon are local and verified; every route has unique metadata; no remote brand-asset request exists. | Complete |
| U-004 | Browser regressions and consumer documentation alignment | R-008, R-010–R-012 / AC-010–AC-015 | gno-shared-components-v2 | U-002, U-003 | Forge then Vera | Automated tests, manual QA artifact, README/consumer references, complete quality gate, and static production build are current and passing. | Complete; MT-004 passed through APR-005 |

## Delivery order and integration

1. Begin from an owner-approved dedicated feature branch based on the agreed
   `master` revision; do not implement on the current ads branch.
2. Implement U-001 through U-003 with focused tests, then U-004 integration.
3. Vera runs the approved checks and completes standalone `manual_testing.md`.
4. Argus independently reviews the complete local diff against these approved
   artifacts. Findings require a separate review-adjustment approval.
5. Orion prepares commit/PR handoff only after passing verification and review;
   commit, push, and PR each retain their own approval gate.

Storybook story updates are N/A because no package component changes. The
documentation site changes links to existing stories but does not modify public
component behavior or supported states.
