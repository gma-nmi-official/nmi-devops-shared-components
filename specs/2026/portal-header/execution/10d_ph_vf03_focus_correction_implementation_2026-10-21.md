# Implementation Report: PH-VF03 Focus Lifecycle Correction

## Result

Forge completed the in-scope PH-VF03 correction. Configured unit, integration,
browser, build, package, and whitespace checks pass. PH-MT02 and PH-AC04/
PH-AC10 remain **FAIL pending retest** because independent Vera revalidation has
not yet been performed.

## Context and authorization

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Base HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with an existing dirty Portal
  Header candidate.
- Tracked-diff reference after the correction and evidence updates:
  `1f33da55a1b96809679a8f13bec1377a804497a0`. This hash does not include
  untracked candidate files; the repository remains intentionally unstaged.
- Trigger: PH-MT02 failure PH-VF03 in
  `10c_ph_mt02_keyboard_verification_2026-10-21.md`, followed by the user's
  instruction to proceed.
- Scope basis: the correction implements the already approved keyboard,
  outside-close, and focus-restoration behavior under PH-A10/PH-A11. It does not
  add or revise a public requirement.

## Implementation

| Area | Change | Requirement link |
| --- | --- | --- |
| Focus trap | Derive the first/last boundary from currently visible focusable controls, excluding responsive-hidden desktop/mobile duplicates | PH-R03, PH-R08; PH-AC04, PH-AC10 |
| Outside close | Close on completed click handling so browser pointer-focus behavior occurs before the existing state effect restores the trigger | PH-R03, PH-R08; PH-AC04 |
| Unit regression | Reopen the dropdown, activate outside content, and assert closure, unlocked scrolling, and trigger focus | PH-AC04 |
| Browser regression | At `375px` and `1440px`, assert forward/backward visible-boundary wrapping plus outside-close focus and scroll restoration | PH-AC04, PH-AC10 |
| Story/catalog | Assert open-state focus behavior and describe visible contained focus plus close restoration | PH-R11; PH-AC13, PH-AC14 |
| Changelog | Record the focus-containment and outside-close correction | PH-R12; PH-AC18 |

No public component prop, package export, navigation/social/search behavior, or
production styling contract changed.

## Validation evidence

| Command/check | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npx vitest run packages/ui/src/components/portal-header/portal-header.test.tsx` | PASS, 13/13 |
| Focused Playwright PH-VF03 regression selection | PASS, 6/6 |
| Interactive desktop replay at `http://localhost:3000/catalog` | PASS: last visible link wraps to Home; outside click closes, unlocks scroll, and focuses `Open menu` |
| `npm run check` | PASS: typecheck, lint, 13/13 unit/a11y, 2/2 consumer fixtures, Storybook build, package build, Next.js build |
| `npm run test:e2e` | PASS, 26/26 configured Chromium desktop/mobile cases |
| `npm run pack:check` | PASS, 37 files; 21.6 kB package, 76.3 kB unpacked |
| `git diff --check` | PASS; only existing Git LF-to-CRLF notices |

Expected non-failing warnings remained limited to Vite consumer handling of
`"use client"`, Storybook chunk sizing, the Node `module.register` deprecation,
Playwright `FORCE_COLOR`, and Git line-ending notices.

## Risks and remaining work

- Automated evidence shows the diagnosed behaviors are corrected, but the
  independent failing manual case cannot be self-overwritten by Forge.
- Vera must repeat PH-MT02 at desktop and mobile widths and rerun the affected
  regression surface against this candidate.
- PH-MT01 remains partially evidenced/BLOCKED; PH-MT03-PH-MT08 and the required
  native latest-two browser matrix remain incomplete.
- Argus review and every Git/release action remain gated and unperformed.
- The untracked `.playwright-mcp/` directory is preserved as user/runtime
  evidence and is excluded from delivery scope.

## Handoff

Next owner: Vera. Revalidate PH-MT02, update PH-VF03 and PH-AC04/PH-AC10 from
the observed result, then continue the remaining manual/browser verification if
the correction passes.
