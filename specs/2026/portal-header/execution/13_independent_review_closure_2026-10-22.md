# Independent Review Closure: Portal Header

## Decision

**PROCEED to Orion commit preparation.** ARG-PH-01 through ARG-PH-03 are
closed against the corrected dirty Portal Header candidate. No Critical, Major,
Minor, or Suggestion finding remains from report 11, and this closure found no
new required correction within the approved PH-A22 scope.

This decision closes independent code review only. It does not grant commit,
push, pull-request, release, merge, or deployment approval.

## Context

- Reviewer/role: Argus, independent of Forge implementation and Vera
  verification.
- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Recorded base/HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296`.
- Candidate: the existing unstaged and untracked Portal Header change set after
  PH-A22 implementation report 12a and Vera PASS report 12b.
- Review time: 2026-10-22 16:54 +08:00, Asia/Shanghai.
- Scope protection: `.playwright-mcp/` and
  `specs/2026/public-storybook-documentation/` were excluded and remain outside
  the reviewed delivery.
- Preserved qualifications: PH-A20's real-screen-reader waiver and PH-A21's
  deferred Firefox, Safari, and second-version coverage remain accepted
  residual risks; they are not reopened findings.

## Prerequisite assessment

Report 12b independently records PASS for the focused token regression,
`npm run check`, the 28/28 configured Playwright suite, `npm run pack:check`,
the three-way logo hash comparison, built-CSS inspection, unused-token scan,
and `git diff --check`. This satisfies the required post-adjustment Vera gate.

## Finding closure

| Finding | Independent evidence | Decision |
| --- | --- | --- |
| ARG-PH-01 | `packages/ui/src/styles.css` uses `var(--gno-portal-header-text)` for the root, section label, navigation links, icon buttons, and social links while retaining the white default. `packages/ui/README.md` accurately limits overrides to the `.gno-portal-header` component root. The focused computed-style test covers white defaults and the `rgb(18, 52, 86)` root override on the section label, menu control, visible social link, and Home link. Argus reran it in configured desktop/mobile Chromium: 2/2 PASS. Built CSS contains the same corrected rules. | **CLOSED** |
| ARG-PH-02 | `asset_inventory.md` now records the implemented, hash-matched, exported, and packaged state without changing the rights qualification. Argus independently decoded and hashed the source SVG, embedded data URI, and built SVG: all are 1,659 bytes with SHA-256 `4265686660c12d10f6954d8dec60884933d680f10dd79a4ff7a76c016d62f39a`. The package export maps `./assets/gma-header-logo.svg` to `./dist/assets/gma-header-logo.svg`; Vera's dry run includes that asset and the notice file. | **CLOSED** |
| ARG-PH-03 | `--gno-color-muted` is absent from implementation and public output. Repository matches are limited to approval and review history, preserving traceability without expanding the Portal Header CSS surface. | **CLOSED** |

## Independent checks

| Check | Result |
| --- | --- |
| Corrected source, README, focused test, built CSS, and asset inventory inspection | PASS |
| `npx playwright test --grep "Portal Header applies its text token from the component root"` | PASS, 2/2 configured desktop/mobile projects; the restricted first attempt returned Windows `spawn EPERM`, then the authorized outside-sandbox rerun passed |
| Source/embedded/built logo SHA-256 and byte-length comparison | PASS; all three are 1,659 bytes and match the approved hash |
| Implementation/public-output scan for `--gno-color-muted` | PASS; no implementation match |
| `git diff --check` | PASS; only existing LF-to-CRLF conversion notices |

## Required corrections and optional suggestions

- Required corrections: none open.
- Optional suggestions: none.

## Handoff

Atlas may hand the reviewed dirty candidate to Orion to prepare the concrete
commit gate: exact included files, excluded unrelated paths, repository/branch,
proposed message `feat: add GNO-21354 portal header`, passing validation, and
review evidence. Orion must not stage or commit until the user explicitly
approves that concrete summary. Push and pull-request actions remain separate
later gates.
