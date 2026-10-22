# Verification Report: PH-MT02 Keyboard and Pointer Lifecycle

## Result

PH-MT02 is **FAIL** under PH-VF03. Interactive Playwright execution found two
focus-lifecycle defects in the current dirty Portal Header candidate. No source
or test implementation was changed during this verification.

## Candidate and environment

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with dirty candidate
  reference `ac641e8b313e369107e6f51780999e71f84ebc34`.
- Browser: Chromium reporting Chrome `155.0.0.0` on Windows.
- Viewports: `1440x900` and `375x812`.
- Endpoint: `http://localhost:3000/catalog` using synthetic catalog data.
- Execution: Codex Playwright-assisted QA at the user's request on 2026-10-21
  Asia/Shanghai.

## Step evidence

| PH-MT02 behavior | Desktop | Mobile | Result |
| --- | --- | --- | --- |
| Tab to trigger, Enter opens, first link receives focus | `Open menu` then `Home` | `Open menu` then `Home` | PASS |
| Forward/backward focus remains within open dialog | Forward focus escaped into Storybook/catalog/dev-tool controls | `Home` Shift+Tab wraps to RSS; Tab wraps to `Home` | FAIL desktop |
| Escape closes, restores scroll and trigger focus | PASS | PASS | PASS |
| Outside pointer closes, restores scroll and trigger focus | Menu closes and scroll restores; focus ends on `body` | Same | FAIL |
| Search and menu are mutually exclusive | Both opening orders pass and the newly opened control receives focus | Search is contained inside the mobile menu | PASS desktop/applicable behavior |
| Keyboard link activation occurs once | Intercepted `Home` activation count was `1`; menu closed and local URL stayed unchanged | Covered by shared interaction behavior | PASS |

## PH-VF03 diagnosis

The desktop panel has 16 visible navigation links, but the focus-trap query
collects 23 anchors/buttons. Its configured last item is the hidden mobile RSS
link, while the actual last visible desktop item is `GMA Now`. The Tab boundary
therefore never recognizes the visible last item and focus escapes the dialog.
This is a direct DOM observation; filtering the boundary list to currently
focusable/visible elements is the proposed correction direction.

For outside closure, the pointer-down state change closes the panel and restores
body scrolling, but after the pointer sequence completes the active element is
`body` rather than the menu trigger at both widths. Escape restoration proves
the trigger can be focused through the existing state path; outside-pointer
closure needs restoration that survives the pointer event's default focus
behavior.

## Handoff

- PH-AC04 and the keyboard portion of PH-AC10: **FAIL**.
- PH-MT02: **FAIL**.
- Next owner: Forge corrects PH-VF03 within the already-approved focus lifecycle
  scope and adds desktop/mobile boundary plus outside-close regression tests.
- Vera then reruns the focused interaction checks and affected full gates.
- No Git staging, commit, push, PR, merge, release, or deployment was performed.
