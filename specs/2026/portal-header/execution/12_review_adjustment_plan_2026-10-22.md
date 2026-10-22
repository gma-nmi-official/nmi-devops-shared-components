# Review Adjustment Plan: Portal Header

## Status

**Approval required.** This plan responds only to ARG-PH-01 through ARG-PH-03
from report 11. No implementation or test change is authorized until the user
approves this concrete plan.

## Proposed corrections

| Finding | Forge correction | Impact |
| --- | --- | --- |
| ARG-PH-01 | Replace hard-coded header text/control colors with the documented Portal Header text token where appropriate; make the supported CSS override location accurate in implementation or README; add a focused computed-style regression | Restores the approved public theming contract without changing default production appearance or props |
| ARG-PH-02 | Update `asset_inventory.md` to record the actual source/embedded SHA-256 match, package export, and completed implementation status | Documentation/evidence only |
| ARG-PH-03 | Determine whether the unused `--gno-color-muted` edit belongs to unrelated work; exclude it from the Portal Header delivery or obtain separate scope approval, preserving the user's work | Prevents an unapproved public token from entering this delivery |

## Validation plan

1. Forge records the requirement-to-file mapping and confirms the default
   computed production colors remain unchanged.
2. Vera runs the focused token override test plus `npm run check`,
   `npm run test:e2e`, `npm run pack:check`, and `git diff --check`.
3. Vera confirms the source and embedded logo SHA-256 remain
   `4265686660c12d10f6954d8dec60884933d680f10dd79a4ff7a76c016d62f39a` and
   the package inventory still includes the exported SVG and notices.
4. Argus independently confirms all three findings against the corrected dirty
   candidate and records review closure.

## Boundaries

- Preserve PH-A20/PH-A21 and their documented residual risks.
- Do not change navigation, social presets, search, public props, production
  dimensions, logo artwork, or menu behavior.
- Do not modify or include `.playwright-mcp/` or
  `specs/2026/public-storybook-documentation/`.
- No staging, commit, push, pull request, release, merge, or deployment action
  is authorized by this plan. The future proposed commit message remains
  `feat: add GNO-21354 portal header`.

## Next gate

The user must explicitly approve these review adjustments. After approval,
Atlas hands the plan to Forge, then Vera, then Argus. Orion remains gated until
the review closes and a separate concrete commit summary receives explicit
commit approval.
