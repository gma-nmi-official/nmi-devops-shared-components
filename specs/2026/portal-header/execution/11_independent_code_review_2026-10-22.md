# Independent Code Review: Portal Header

## Decision

**BLOCKED pending approved review adjustments.** The exact dirty Portal Header
candidate is functionally well covered and all independently rerun automated
checks pass, but three Minor required findings remain open, including one
scope-isolation finding. No Critical or Major finding was identified.

## Context

- Reviewer/role: Argus, independent of Forge implementation and Vera
  verification.
- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Recorded base/HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296`.
- Candidate: the existing unstaged and untracked Portal Header change set handed
  off by report 10j.
- Review date/timezone: 2026-10-22, Asia/Shanghai.
- Approved qualifications: PH-A20 and PH-A21. Real screen-reader, Firefox,
  Safari, and second-version browser coverage are accepted residual risks and
  are not review findings.
- Scope protection: `.playwright-mcp/` and
  `specs/2026/public-storybook-documentation/` were inspected only as worktree
  context and remain excluded from this review and any proposed delivery.

## Independent evidence

| Check | Result |
| --- | --- |
| Requirements/design/API/source/output inspection | Completed against PH-R01-PH-R12, PH-NFR01-PH-NFR08, and PH-AC01-PH-AC22 |
| `npm run check` | PASS; 13/13 unit/accessibility tests, two consumer fixtures, Storybook, and Next.js 16.3.8 build |
| `npm run test:e2e` | PASS; 26/26 configured Chromium desktop/mobile cases |
| `npm run pack:check` | PASS; 37 files, 21.6 kB packed, 76.3 kB unpacked |
| `git diff --check` | PASS; line-ending conversion notices only |
| Asset integrity | PASS; source SVG and embedded default both match SHA-256 `4265686660c12d10f6954d8dec60884933d680f10dd79a4ff7a76c016d62f39a` |
| Client boundary/output scan | PASS; compiled interactive module retains `"use client"`; no Next.js, GA/analytics, jQuery, Fontello, Bootstrap, remote font, or remote default-asset runtime dependency found |

The first restricted executions of Vitest, Playwright, and npm package-cache
access encountered Windows sandbox `EPERM`. Authorized reruns outside that
restriction produced the passing results above; these were infrastructure
failures, not application failures.

## Required findings

### ARG-PH-01 — Minor — public Portal Header color-token contract is not honored

- Requirement: PH-R02 approved configurable theming; approved default 5 and
  PH-D09 require public CSS variables for header colors. The package README also
  documents `--gno-portal-header-text` as an overrideable token.
- Location: `packages/ui/src/styles.css:7-18`, `:34`, `:38`, `:43-44`;
  `packages/ui/README.md:92-101`.
- Evidence: `--gno-portal-header-text` is defined and assigned only to the
  header root. Section labels, navigation links, icon buttons, and social links
  then replace the inherited value with hard-coded `#fff`; their visible color
  therefore does not change when the documented token changes. In addition,
  the README says tokens may be set on an ancestor, but every token is declared
  on `.gno-portal-header`, so inherited ancestor values cannot override those
  declarations.
- Impact: consumers following the public styling contract receive a partially
  ineffective theme. Default production styling remains correct, which limits
  severity, but the approved/documented customization surface is inaccurate.
- Required correction: make the documented text token drive the applicable
  visible text/control rules. Either make ancestor token inheritance actually
  work or narrow the documentation to a verified component-targeting override
  mechanism. Preserve the approved default colors and production layout.
- Validation: add a focused computed-style regression for the supported token
  override path, rerun unit/accessibility, Storybook/Next/consumer builds,
  Playwright, package inspection, and `git diff --check`.

### ARG-PH-02 — Minor — asset inventory still reports the implemented logo copy as deferred

- Requirement: PH-R02/PH-AC02 require approved assets to be stored, versioned,
  packaged, and discoverably evidenced.
- Location: `specs/2026/portal-header/asset_inventory.md:7`.
- Evidence: the row status remains `Approved input; copy deferred to
  implementation`, while `packages/ui/src/assets/gma-header-logo.svg`, the
  compiled asset export, the embedded default, and the passing 37-file package
  inventory prove implementation is complete.
- Impact: the authoritative asset record contradicts the reviewed package and
  weakens release traceability; there is no runtime defect.
- Required correction: update the status/verification wording to the actual
  implemented, hash-matched, packaged state without changing the approved
  rights qualification.
- Validation: inspect the source/embedded hashes and rerun package dry-run
  inventory.

### ARG-PH-03 — Minor — unrelated global token addition is mixed into the feature diff

- Requirement: AGENTS.md core rule 4 requires avoiding unrelated refactoring;
  PH-R01/PH-R02 constrain the public package surface to the approved component
  delivery.
- Location: `packages/ui/src/styles.css:3`.
- Evidence: the candidate adds `--gno-color-muted:#526077` to the global token
  set, but no source, story, catalog, test, or Portal Header requirement uses
  that token, and the changelog does not identify a separate public-token
  addition.
- Impact: committing it with Portal Header would expand the shared public CSS
  surface without an approved need or validation. It may also belong to
  unrelated work that must be preserved rather than absorbed.
- Required correction: confirm ownership. Remove it from the Portal Header
  candidate if accidental, or keep it isolated for its separately approved
  delivery unit; do not discard unrelated user work.
- Validation: inspect the corrected diff and rerun the normal stylesheet/build
  regression surface.

## Optional suggestions

None. The review intentionally does not reopen the PH-A20/PH-A21 accepted-risk
decisions or request unrelated modernization.

## Areas reviewed without findings

- Public runtime/type/style/asset exports and the package inventory.
- Complete 16-link navigation defaults, exact DOM order, stable-ID patch/hide/
  append behavior, current/disabled/external states, and safe `rel` handling.
- Entertainment/News social presets, HTTPS filtering, generic-icon fallback,
  and absence of analytics behavior.
- Optional native GET search, blank rejection, input trimming, URL rejection,
  and search/menu mutual exclusion.
- Default anchors, throwing-adapter fallback, Next.js consumer adapter, SSR
  build, and compiled client boundary.
- Menu semantics, visible focus containment, Escape/outside closure, focus
  restoration, scroll locking, responsive layout, grid glyph, logo fallback,
  and repository-local assets/licensing.
- Dedicated unit/accessibility tests, Storybook states, catalog guidance,
  consumer fixtures, migration guide, and changelog qualification.

## Handoff

Atlas should present report 12's adjustment plan for explicit user approval.
If approved, Forge may implement only those corrections, Vera must revalidate
the affected behavior and regressions, and Argus must close these findings
before Orion prepares the commit gate. This review grants no commit, push, PR,
release, merge, or deployment authority.
