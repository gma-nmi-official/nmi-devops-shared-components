# Portal Header PR #13 code review adjustments

## Scope

This follow-up addresses the remaining PR #13 comment and the approved optional
hardening items on `feature/portal-header-review-adjustments-v2` from master
`72d2bcc`:

- CR-004: isolate errors thrown while a consumer router adapter renders its
  returned React element and fall back to a safe anchor for that link.
- CR-005: restore readable resolver control flow and preset object formatting.
- CR-006: use one typed `mergeDefined` helper for navigation and social patch
  resolution.
- CR-007: correct the prior execution record so CR-001 is tied to the master
  documentation revamp and revision-scoped browser evidence.

## Implementation

`PortalHeader` now wraps successful custom-link adapter output in an error
boundary. Synchronous adapter throws and render-time element throws both use the
existing safe-anchor fallback; failures in one link do not remove the rest of
the header. The fallback remains compatible with the existing router adapter
contract and does not add logging or analytics behavior.

Navigation and social resolvers now share the typed `mergeDefined` helper,
which preserves defaults when a patch contains explicit `undefined` values.
The affected resolver branches and social preset entries are formatted as
reviewable, one-decision-per-line code. `README.md`, the catalog guide, and the
Storybook `AdapterRenderFailure` state document the fallback contract.

The earlier CR-002 report now records CR-001 as resolved by the master docs
revamp (`b447759`) and links this follow-up for CR-004 closure. No historical
evidence is reclassified as current branch evidence.

## Validation

- PortalHeader focused Vitest and accessibility regression suite: 17/17 passed.
- Full Vitest suite: 87/87 passed across 9 test files.
- Typecheck/package build: passed.
- Consumer fixtures: passed for all 6 JavaScript/TypeScript fixtures.
- Storybook build, coverage, and catalog documentation checks: passed.
- Targeted ESLint and `git diff --check`: passed.
- Current-state baseline recheck: passed; `state.md` identifies this branch,
  base revision `72d2bcc`, and the dirty follow-up diff.
- Targeted Portal Header Playwright suite: 22/22 passed across desktop/mobile
  and the 320/375/768/1024/1440px overflow matrix.
- The prior synchronized 48/48 evidence remains linked for the complete
  revision; this follow-up adds no new production browser behavior beyond the
  adapter fallback, which is covered by the unit regression and Storybook state.

## Review status

Implementation and local validation are complete. Argus re-review returned
**PROCEED** after the state-record correction; no required findings or scoped
leftovers remain. Commit, push, pull request, merge, release, and deployment
remain separately gated. The user-owned `.playwright-mcp/` files are excluded
from this delivery.
