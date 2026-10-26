# Pre-review Correction Implementation: Portal Header

## Executive Summary

Forge corrected only PH-VF01 and PH-VF02 from Vera's initial PH-06 report under
the existing PH-A11 development approval. Protocol-relative and ambiguous
slash/backslash navigation and search values are now rejected, and custom social
links with whitespace-only accessible labels are omitted. Focused regressions and
the complete implementation validation suite pass.

## Workflow Context

- Repository/branch/base: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`, HEAD/base
  `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with the shared PH-02–PH-06 dirty
  change set.
- Input: `06_verification_report_2026-10-21.md`, findings PH-VF01 and PH-VF02.
- Authorization: Atlas returned both pre-review verification failures to Forge as
  corrections within approved behavior under PH-A11.
- Scope boundary: no other Vera/manual/planning record or `.playwright-mcp/`
  content was changed; no Git delivery or release action was performed.

## Corrections

| Finding | Files | Correction and regression coverage |
| --- | --- | --- |
| PH-VF01 | `packages/ui/src/components/portal-header/portal-header.tsx`; `portal-header.test.tsx` | `isSafeNavigationHref()` now accepts root-relative paths beginning with exactly one `/`, fragments, queries, and syntactically explicit `https://` URLs. It rejects `//host`, slash/backslash ambiguity, any backslash, `http:`, `javascript:`, and non-explicit HTTPS forms. Navigation renders rejected values non-navigably; rejected search actions do not expose search. Tests cover positive and negative navigation plus search cases. |
| PH-VF02 | `packages/ui/src/components/portal-header/social-links.ts`; `portal-header.test.tsx` | Both preset overrides and appended custom links trim labels before resolution. Empty/whitespace-only labels are omitted; valid surrounding whitespace is normalized. Resolver and rendered-DOM tests cover omission and the retained accessible name. |

## Behavior Judgment

Root-relative `/path`, `#fragment`, and `?query` remain consumer-origin values.
Protocol-relative `//host` and any backslash are intentionally rejected instead
of relying on browser URL normalization. Absolute destinations must visibly use
the approved `https://` form. Valid social labels are trimmed because surrounding
whitespace has no semantic value; a blank result cannot provide an accessible
name and therefore suppresses that social entry.

## Evidence

| Command | Result |
| --- | --- |
| `npx vitest run packages/ui/src/components/portal-header/portal-header.test.tsx` | PASS, 10/10 focused component/a11y tests |
| `npm run check` | PASS: package/root typecheck, lint, 10/10 Vitest, two consumer fixture builds, Storybook, and Next.js production build |
| `npm run test:e2e` | PASS, 20/20 Chromium desktop/mobile tests |
| `npm run pack:check` | PASS, 33 intended files; 18.6 kB packed / 60.6 kB unpacked |

Expected pre-existing non-failing warnings remained unchanged: Vite/Storybook
browser bundles ignore the distributed module directive while the package output
preserves it; Storybook docs chunks exceed its advisory threshold; Node reports
the Storybook `module.register()` deprecation; Playwright reports the environment
`NO_COLOR`/`FORCE_COLOR` warning.

## Risks and Recommendation

No new product or architecture decision was introduced. Vera should revalidate
PH-VF01, PH-VF02, PH-AC03, PH-AC07, PH-AC15, PH-NFR02, and the relevant
regressions against this corrected dirty candidate. Existing manual/latest-two
browser blockers from report 06 remain unaffected and must not be inferred PASS.

## Approval Status and Next Stage

- Requirements/development: PH-A10/PH-A11 remain valid.
- Pre-review corrections: implemented within PH-A11; not self-approved.
- Verification: pending Vera revalidation.
- Independent review and all Git/release actions: not reached or authorized.
