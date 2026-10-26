# Manual testing reference for QA: Portal Header PH-06

## Scope and handoff

- Requirements / acceptance criteria and automated test report:
  `requirements.md`, `acceptance_criteria.md`, `nonfunctional_requirements.md`,
  and `execution/06_verification_report_2026-10-21.md`.
- Repository, branch, base/revision, and dirty diff reference:
  `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`, base/HEAD
  `0b2561575b68f1e89ea9cf16fdaaa7e039670296`; uncommitted Portal Header
  implementation plus planning and verification evidence. The unrelated
  `.playwright-mcp/` directory is excluded.
- Environment / build / endpoint: local synthetic fixtures only; Next.js
  catalog at `http://127.0.0.1:3100/catalog` and Storybook at
  `http://127.0.0.1:6006/?path=/docs/components-portalheader--docs`.
- Prepared by and date: Vera, refreshed 2026-10-22 Asia/Shanghai.
- QA recipient / owner: Vera completed the repeatable local synthetic/browser,
  accessibility-mode, package, and documentation cases. The user completed the
  Windows Chrome/Edge zoom check and waived real screen-reader execution under
  PH-A20. PH-A21 accepts the executed configured Chromium and Windows
  Chrome/Edge matrix for this delivery.
- Handoff: Partially executed; PH-MT01-PH-MT02, PH-MT04-PH-MT06, and PH-MT08
  pass. PH-MT03 is N/A/waived with accepted risk; PH-MT07 passes for the revised
  PH-A21 delivery scope with deferred browser risk.
- Required manual checks: keyboard/focus, screen reader, contrast, reduced
  motion, 200% zoom, responsive/long-content presentation, local brand asset
  fallback, and the latest two stable Chrome, Edge, Firefox, and Safari
  versions. Current required manual results are BLOCKED because no human QA
  execution or complete browser infrastructure is available in this session.

This reference supplements automated testing. Preparing it does not mean QA has
executed any case or accepted the component.

## Preconditions and safe setup

1. Use the repository and exact dirty revision described above. Before testing,
   capture `git rev-parse HEAD`, `git status --short`, browser name/version, OS,
   viewport, zoom, assistive technology, and the tested diff/commit reference.
2. Use Node.js `v26.10.0` and npm `11.19.1`, or record the supported replacement.
   From the repository root run `npm ci`, `npm run check`, and
   `npm run test:e2e`. Stop if setup or automated prerequisites fail.
3. Run `npm run dev -- -p 3100` for the catalog and, when a story is needed,
   `npm run dev:storybook`. Use only the synthetic catalog/Storybook data. Do
   not enter credentials or production data and do not activate production
   social destinations; inspect their rendered attributes instead.
4. For browser compatibility, use clean profiles with extensions disabled and
   record each exact stable browser version. Test both latest stable versions
   supported by the approved matrix; Playwright Chromium/WebKit substitutes do
   not count as Chrome, Edge, or Safari version evidence.
5. Cleanup is non-destructive: stop local servers, close clean browser profiles,
   and retain screenshots/logs outside tracked source unless Atlas authorizes
   adding them. Do not modify or delete `.playwright-mcp/`.

## Case PH-MT01: Responsive layout, long content, and 200% zoom

- Requirement / acceptance criterion: PH-R03, PH-R08; PH-AC05; PH-NFR05.
- Test level and required or optional: Manual acceptance, required.
- Preconditions and input data: Catalog and `LongContent` Storybook story;
  desktop and mobile viewport emulation disabled when testing real devices.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 0 | At 1440px and 375px compare the default story with the recorded live GMA News reference measurements in `reference_analysis.md`, including the brand and menu trigger before and after expansion. | Bar is a single dark row, approximately 51px/42px high, with the production-sized logo and section label optically aligned to the blue GMA wordmark (`5px` below the full logo-box center), News-red accent, correct desktop/mobile actions, and no persistent second navigation row. The menu trigger shows nine solid square cells with dark spacing rather than outlined boxes, rounded dots, or an X in both states. |
| 1 | Open the catalog at widths 320, 375, 768, 1024, and 1440 CSS px. | Header and page have no horizontal scrollbar; all controls and content remain reachable. |
| 2 | At each width, open/close the dropdown and search and inspect the long-content story. Verify all 16 default links in reference order: Home through Lifestyle; Sparkle through Pictures; GMA Pinoy TV through Corporate; GMA Play through GMA Now. | Labels wrap safely; no link is omitted or clipped. Desktop navigation forms one primary plus three top-to-bottom network columns; mobile forms two columns with every link reachable by panel scrolling and search/socials inside the panel. |
| 3 | Repeat at browser zoom 200%, including keyboard navigation. | No two-dimensional scrolling is required for ordinary use; focus and controls remain visible and usable. |

- Cleanup / reset: Restore 100% zoom and close the menu/search.
- Actual result: The user reported "LGTM when it zoom" after inspecting the
  current Portal Header candidate at browser zoom. Fresh Chromium checks at
  `320`, `375`, `768`, `1024`, and `1440` CSS px found equal page client/scroll
  widths, `42.39px` mobile and `51px` desktop bars, and a reachable menu whose
  approved navigation starts at Home and ends at GMA Now. The 26-case browser
  suite also passed the five-width overflow and production-layout assertions.
  On 2026-10-22 the user confirmed the complete check was good on Windows in
  installed Chrome `155.0.8059.85` and Edge `155.0.4283.62`, including the
  requested keyboard-at-200%-zoom confirmation.
- Status: PASS.
- Tester / execution date / tested revision: User, 2026-10-21 and 2026-10-22
  Asia/Shanghai;
  `feature/portal-header` at HEAD `0b2561575b68f1e89ea9cf16fdaaa7e039670296`,
  dirty candidate reference `ac641e8b313e369107e6f51780999e71f84ebc34`.
- Evidence / screenshot / log reference: User statement in the project session,
  "LGTM when it zoom", later "All goods upon check", Windows/Chrome/Edge, and
  confirmation of keyboard use at 200%; installed browser versions were read
  locally. Direct five-width measurements and report 10f provide supplemental
  evidence.
- Defect reference and retest result: No defect observed.

## Case PH-MT02: Keyboard dropdown, outside close, and focus lifecycle

- Requirement / acceptance criterion: PH-R03, PH-R08; PH-AC04, PH-AC10;
  PH-NFR01.
- Test level and required or optional: Manual accessibility acceptance, required.
- Preconditions and input data: Catalog at 375 px and 1440 px; keyboard only.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Tab to the menu trigger and press Enter, then cycle forward and backward with Tab/Shift+Tab. | Trigger exposes expanded state, focus enters the full-width dropdown, stays within its active controls, and every focus indicator is visible. |
| 2 | Press Escape. Reopen and activate an outside area with an appropriate pointer. | Each action closes the dropdown, restores body scrolling, and returns focus to the menu trigger. |
| 3 | Open search, then open menu; repeat in reverse order. | Search and menu are mutually exclusive and the newly opened control receives appropriate focus. |
| 4 | Activate a dropdown navigation link with the keyboard. | Dropdown closes and link activation occurs once. |

- Cleanup / reset: Close open panels and restore the initial URL.
- Actual result: Independent Playwright revalidation at `1440x900` and
  `375x812` confirmed that opening focuses `Home`; the last visible control
  wraps forward to `Home`; `Home` wraps backward to the last visible control;
  Escape and outside click both close the dialog, restore `Open menu` focus,
  and restore body overflow to `visible`. Desktop search/menu opening orders
  are mutually exclusive and focus the newly opened control; mobile search
  remains contained in the open dialog. Safely intercepted Enter activation
  fired once at each width, closed the menu, restored focus/scroll, and left
  the browser at the local catalog URL.
- Status: PASS.
- Tester / execution date / tested revision: Vera independent Playwright QA,
  2026-10-21 Asia/Shanghai; Playwright Chromium `153.0.8010.12` on Windows,
  `1440x900` and `375x812`; `feature/portal-header` at HEAD
  `0b2561575b68f1e89ea9cf16fdaaa7e039670296`, dirty corrected candidate from
  Forge report 10d (`1f33da55a1b96809679a8f13bec1377a804497a0` tracked-diff reference).
- Evidence / screenshot / log reference: Direct installed-Playwright execution
  against `http://localhost:3000/catalog`, focused Playwright regression 6/6,
  and `execution/10e_ph_vf03_correction_revalidation_2026-10-21.md`. The prior
  failing interactive evidence remains preserved in report 10c and the update
  history below.
- Defect reference and retest result: PH-VF03; PASS after Forge correction.

## Case PH-MT03: Screen-reader semantics and announcements

- Requirement / acceptance criterion: PH-R08; PH-AC03, PH-AC04, PH-AC07,
  PH-AC10; PH-NFR01.
- Test level and required or optional: Manual accessibility acceptance, required.
- Preconditions and input data: One supported browser/assistive-technology pair
  per QA platform; catalog with current, disabled, external, social, and search
  states.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Navigate landmarks, headings, primary/network navigation, and social links by screen reader. | Landmarks have distinct names; current and disabled states are announced; every social icon link has a meaningful accessible name. |
| 2 | Open/close menu and search using keyboard commands. | Trigger names/state changes and dialog/search purpose are announced without duplicate or hidden controls entering navigation. |
| 3 | Cause the configured logo to fail in the failure story. | Visible and announced `GMA Network` fallback remains available. |
| 4 | Submit a blank search, then a trimmed valid query. | Blank input produces an understandable validation message; a valid query is submitted once with the configured name. |

- Cleanup / reset: Disable the screen reader if required and restore the catalog.
- Actual result: Not executed. The user used a browser screen recorder, which
  does not test screen-reader announcements, then explicitly directed that this
  acceptance check be overridden. PH-A20 records the resulting delivery waiver.
- Status: N/A / WAIVED by product owner under PH-A20; accessibility risk accepted
  for this delivery. This is not a technical PASS.
- Tester / execution date / tested revision: Not executed; waiver approved by
  the user on 2026-10-22 Asia/Shanghai against the current dirty candidate.
- Evidence / screenshot / log reference: Project-session statements "screen
  recorder in browser" and "Please override this as passed"; PH-A20 and report
  10g.
- Defect reference and retest result: PH-VF02 is resolved in automated/browser
  evidence; real announcement behavior remains blocked and unclaimed.

## Case PH-MT04: Visual contrast, focus, theme, and reduced motion

- Requirement / acceptance criterion: PH-R08; PH-AC10; PH-NFR01.
- Test level and required or optional: Manual accessibility/visual acceptance,
  required.
- Preconditions and input data: Default and `CustomSectionAccent` stories; OS/browser
  reduced-motion setting available; a WCAG contrast inspection tool.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Inspect text, icons, controls, current/disabled states, and focus indicators in light and dark themes. | Required text/non-text contrast is met and state is not communicated by color alone. |
| 2 | Enable `prefers-reduced-motion: reduce` and operate menu/search. | Interaction remains clear and usable with transitions removed or minimized. |
| 3 | Test forced-colors/high-contrast mode where supported. | Labels, outlines, and controls remain distinguishable and usable. |

- Cleanup / reset: Restore OS/browser appearance and motion settings.
- Actual result: Local Chromium inspection confirmed the production dark bar
  computes to `rgb(46, 46, 46)` with white label text (approximately `13.6:1`),
  current/disabled states retain semantic attributes, and keyboard focus uses a
  visible `3px` solid outline with `3px` offset. The same indicator remained
  solid and visible under forced-colors and increased-contrast emulation.
  Reduced-motion emulation retained clear operation with no transition
  duration. The configurable accent test and axe serious/critical scan passed.
- Status: PASS for the available Chromium accessibility-mode matrix.
- Tester / execution date / tested revision: Vera, 2026-10-22 Asia/Shanghai;
  Playwright Chromium `153.0.8010.12` on Windows; HEAD `0b2561575b68f1e89ea9cf16fdaaa7e039670296`,
  dirty candidate reference `7da8d440643c7ea37ec59e3cff0f9a082c9c6fae`.
- Evidence / screenshot / log reference: Direct local Playwright computed-style
  inspection, targeted 13/13 Vitest run, and report 10f.
- Defect reference and retest result: None.

## Case PH-MT05: Social presets, safe targets, overrides, and fallbacks

- Requirement / acceptance criterion: PH-R02, PH-R06; PH-AC02, PH-AC03,
  PH-AC07, PH-AC08.
- Test level and required or optional: Manual integration/acceptance, required.
- Preconditions and input data: Entertainment, News, none, and failure stories;
  do not follow production social links.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Inspect Entertainment and News links and switch to `none`. | Exact approved HTTPS destinations appear in approved order; Viber is News-only; `none` removes the social region. |
| 2 | Apply same-ID override, hide one default, and append a labelled unknown icon ID. | Override retains position, hidden default disappears, new ID appends, and the generic link icon has the supplied accessible label. |
| 3 | Supply `javascript:`, `http:`, missing/whitespace-only labels, and `_blank` links. | Unsafe links and unnamed custom links are omitted; every `_blank` link includes `noopener noreferrer`. |
| 4 | Inspect network requests and DOM handlers while rendering/operating socials. | No remote icon/font/logo request, GA/analytics event, inline tracking handler, or legacy runtime is present. |

- Cleanup / reset: Restore the default Entertainment story.
- Actual result: PASS. Both immutable presets resolved to the approved HTTPS
  order (`5` Entertainment; `6` News including Viber), while `none` resolved
  empty. Targeted component tests passed same-ID override, hide, append,
  generic-icon/trimmed-label, whitespace-only-label omission, unsafe URL
  omission, and safe `_blank` behavior. Local Chromium rendered all six News
  links with accessible names and `noopener noreferrer`; it observed no inline
  `onclick` and no external request during catalog load/operation. Source and
  built-output scans found no GA, analytics, legacy runtime, or remote asset
  coupling.
- Status: PASS.
- Tester / execution date / tested revision: Vera, 2026-10-22 Asia/Shanghai;
  Playwright Chromium `153.0.8010.12` on Windows; same candidate as PH-MT04.
- Evidence / screenshot / log reference: Targeted 13/13 Vitest run, 26/26
  Playwright suite, direct local request/DOM inspection, preset resolver output,
  prohibited-runtime scan, and report 10f.
- Defect reference and retest result: PH-VF02 remains resolved; PASS.

## Case PH-MT06: Search and navigation URL safety

- Requirement / acceptance criterion: PH-R02, PH-R04; PH-AC03, PH-AC06;
  PH-NFR02, PH-NFR03.
- Test level and required or optional: Manual negative integration, required.
- Preconditions and input data: Synthetic navigation/search configs including
  relative URLs, explicit HTTPS URLs, blank values, `javascript:`, `http:`, and
  protocol-relative `//attacker.example` values. Do not allow external network
  access during the negative test.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Render relative and explicit HTTPS navigation/search configuration. | Valid controls render and preserve current/disabled/external/new-tab semantics. |
| 2 | Render blank, `javascript:`, `http:`, and protocol-relative navigation/search values. | Every unsafe/ambiguous value is non-navigable or omitted; no request leaves the local safe fixture. |
| 3 | Submit blank and whitespace-only search, then `  sample query  `. | Blank submissions stay put with validation; valid input submits exactly once as `sample query`. |
| 4 | Use a throwing router adapter. | Standard anchor fallback preserves core navigation without a component crash. |

- Cleanup / reset: Restore safe fixture data and verify no external request ran.
- Actual result: PASS. Targeted tests accepted `/`, fragment, query, and explicit
  HTTPS navigation, rejected protocol-relative, slash/backslash-ambiguous,
  HTTP, and JavaScript navigation/search actions, and preserved an anchor when
  the router adapter threw. The local browser stayed on `/catalog` for blank
  input and submitted trimmed input once as `?q=sample+query`; no external
  request was made.
- Status: PASS.
- Tester / execution date / tested revision: Vera, 2026-10-22 Asia/Shanghai;
  Playwright Chromium `153.0.8010.12` on Windows; same candidate as PH-MT04.
- Evidence / screenshot / log reference: Targeted 13/13 Vitest run, the safe
  social/search Playwright case in the 26/26 suite, direct request inspection,
  and report 10f.
- Defect reference and retest result: PH-VF01 remains resolved; PASS.

## Case PH-MT07: Supported browser matrix

- Requirement / acceptance criterion: Approved compatibility default; PH-AC05,
  PH-AC10, PH-AC11, PH-AC15; PH-NFR07.
- Test level and required or optional: Browser acceptance/regression, required.
- Preconditions and input data: Latest two stable releases at execution time of
  Chrome, Edge, Firefox, and Safari on supported native operating systems; record
  all exact versions.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Execute PH-MT01 through PH-MT06 in both required Chrome versions. | All applicable cases pass with no console, hydration, layout, or interaction failures. |
| 2 | Repeat in both required Edge versions. | Same result. |
| 3 | Repeat in both required Firefox versions. | Same result. |
| 4 | Repeat in both required Safari versions on native Apple infrastructure. | Same result. |

- Cleanup / reset: Close clean profiles and retain the version/evidence matrix.
- Actual result: The configured suite passed 26/26 in bundled Playwright
  Chromium `153.0.8010.12`. A subsequent installed-browser run passed all 52
  desktop/mobile cases across Chrome `155.0.8059.85` and Edge `155.0.4283.62`.
  Installed Firefox `152.0.4` was detected, but stock Firefox exited before
  Playwright's required automation connection could initialize; all 26 Firefox
  attempts were infrastructure BLOCKED rather than application failures. No
  second-version binaries or native Safari infrastructure are available.
- Status: PASS for the PH-A21 delivery scope. Current installed Chrome and Edge
  plus configured Playwright Chromium pass; latest-two, executable Firefox, and
  native Safari coverage are explicitly deferred residual risk.
- Tester / execution date / tested revision: Vera, 2026-10-22 Asia/Shanghai;
  current dirty candidate at base HEAD `0b2561575b68f1e89ea9cf16fdaaa7e039670296`.
- Evidence / screenshot / log reference: Report 06 records the earlier blocked
  supplemental attempt; reports 10f and 10h record bundled Chromium and branded
  installed-browser results.
- Defect reference and retest result: No Chrome/Edge defect observed; remaining
  result is infrastructure BLOCKED.

## Case PH-MT08: Package consumer and documentation regression

- Requirement / acceptance criterion: PH-R01, PH-R07, PH-R11, PH-R12;
  PH-AC01, PH-AC09, PH-AC13 through PH-AC18.
- Test level and required or optional: Manual integration/regression, required.
- Preconditions and input data: Dry-run package contents, JavaScript/TypeScript
  fixtures, catalog, package README, migration guide, and Storybook.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Install the produced package in clean JS and TS React 19/Next.js 16 fixtures and import the component plus `styles.css`. | Runtime, declarations, CSS, logo asset, default anchors, and documented adapter build without package-private imports. |
| 2 | Compare stories/catalog controls with public props and supported states. | Desktop/mobile compact bar, open dropdown, navigation/social/search, long content, configurable accent, and failure states are discoverable and accurate. |
| 3 | Follow the migration guide with synthetic legacy configuration. | Navigation, social presets/patches, search, unsupported behaviors, and router migration are unambiguous. |

- Cleanup / reset: Remove disposable fixture directories only after confirming
  their exact safe paths; retain logs.
- Actual result: PASS. Fresh JavaScript and TypeScript consumer fixtures built
  from the package output; the public declarations, CSS, local logo, README, and
  third-party notice were present in the 37-file dry-run artifact. Storybook
  built nine supported-state stories, the Next.js catalog built successfully,
  and independent documentation inspection confirmed installation/import,
  presets/patches, router adapter, unsupported legacy behavior, migration, and
  rollback guidance.
- Status: PASS.
- Tester / execution date / tested revision: Vera, 2026-10-22 Asia/Shanghai;
  Node `v26.10.0`, npm `11.19.1`; same candidate as PH-MT04.
- Evidence / screenshot / log reference: `npm run check`, `npm run pack:check`,
  story/catalog/migration inventory scan, and report 10f.
- Defect reference and retest result: None.

## Results and next action

- Totals: 8 required manual cases; 0 PASS, 0 FAIL from human execution,
  8 BLOCKED, 0 N/A.
- Prior automated/static defects PH-VF01 and PH-VF02 are resolved and preserved
  in reports 06/06a/06b; PH-07 materially revises visual/menu behavior.
- QA owner: pending assignment. Handoff is prepared only; it has not been sent.
- Next action: Forge corrects PH-VF01 and PH-VF02 within the approved scope,
  Vera reruns affected automated/regression checks and refreshes this reference,
  then the assigned QA owner executes every required manual/browser case on the
  exact candidate revision. No required FAIL or BLOCKED result permits release
  readiness.

## Revalidation update: 2026-10-21 Asia/Shanghai

The results above preserve the initial PH-06 handoff state. Forge subsequently
corrected PH-VF01 and PH-VF02 under the existing development approval, and Vera
independently revalidated the corrections in
`execution/06b_correction_revalidation_2026-10-21.md`:

- protocol-relative, slash/backslash-ambiguous, HTTP, and JavaScript navigation
  and search values are rejected; approved single-slash relative, fragment,
  query, and explicit HTTPS values remain accepted by the shared classifier;
- whitespace-only new social labels are omitted and valid labels are trimmed;
- the focused 10-test suite, full quality gate, 20 configured Chromium tests,
  package inspection, built-output scan, and prohibited-runtime scan pass.

PH-VF01 and PH-VF02 are therefore ready for manual retest in PH-MT05 and
PH-MT06; they are no longer open implementation failures. This does not change
the recorded manual results: all 8 cases remain BLOCKED and unexecuted, the QA
recipient remains pending assignment, and the latest-two stable Chrome, Edge,
Firefox, and Safari matrix still requires suitable infrastructure. The next
action is assigned human QA/browser execution on the exact candidate, followed
by Vera evidence refresh.

## PH-07 visual-alignment update: 2026-10-21 Asia/Shanghai

PH-A12/PH-A13 materially revise the candidate to use the measured live GMA News
header as its visual/interaction baseline. PH-MT01, PH-MT02, PH-MT04, PH-MT07,
and PH-MT08 must be executed against the compact dark bar and responsive
full-width dropdown described above. Forge report 07 records passing configured
automation, including production-structure assertions and the five approved
overflow widths, but does not change the manual totals: all eight required
human/browser cases remain BLOCKED pending an assigned QA owner and the approved
native browser infrastructure.

## PH-09 navigation and menu-grid update: 2026-10-21 Asia/Shanghai

PH-A14/PH-A15 add the complete 16-link production navigation preset and exact
reference order. PH-A16/PH-A17 replace the visually different grip; PH-A18
corrects the local SVG to nine solid square cells matching the live
`glyph-icon icon-menu-grid` silhouette without loading Fontello. PH-MT01,
PH-MT02, PH-MT04, PH-MT07, and
PH-MT08 require retest against this candidate. Automated Forge evidence does not
change the manual status: all eight required cases remain BLOCKED pending human
QA and approved native-browser infrastructure.

## PH-10 independent verification update: 2026-10-21 Asia/Shanghai

Vera independently reran the revised candidate as recorded in
`execution/10_navigation_correction_verification_2026-10-21.md`. The full
quality gate, 22 configured Chromium desktop/mobile cases, package inspection,
and targeted source/built-output scans pass. Automated evidence covers the five
approved widths, complete 16-link order and URLs, desktop/mobile column layout,
mobile last-link reachability, and the nine solid-square glyph in closed and
expanded states.

This does not change any manual result: PH-MT01 through PH-MT08 remain
unexecuted and BLOCKED (0 PASS, 0 human-execution FAIL, 8 BLOCKED, 0 N/A).
In particular, 200% zoom, screen-reader, human keyboard/pointer, contrast and
preference modes, and the latest-two stable Chrome/Edge/Firefox/native Safari
matrix remain required. The QA/accessibility recipient is still pending
assignment; the handoff is prepared, not sent or executed.

## PH-10b logo-label alignment revalidation: 2026-10-21 Asia/Shanghai

Vera independently revalidated the PH-A19/PH-10a optical-alignment correction
as recorded in
`execution/10b_logo_label_alignment_revalidation_2026-10-21.md`. The full
quality gate, 22 configured Chromium desktop/mobile cases, package inspection,
built CSS, and prohibited-runtime scans pass. Direct local browser measurement
at `1440x900` and `375x812` confirms a `66x40` logo, the label center exactly
`5px` below the logo-box center, unchanged `51px`/`42.4px` bar heights, and zero
page-level horizontal overflow.

This configured evidence restores the automated portion of PH-AC20 after
PH-A19, but does not claim human execution. PH-MT01 through PH-MT08 remain
unexecuted and BLOCKED (0 PASS, 0 human-execution FAIL, 8 BLOCKED, 0 N/A).
Manual comparison at 200% zoom, real keyboard/screen-reader and contrast/
preference-mode checks, and the latest-two stable Chrome/Edge/Firefox/native
Safari matrix remain required. The QA/accessibility recipient is still pending
assignment; the handoff is prepared, not sent or executed.

## User zoom observation update: 2026-10-21 Asia/Shanghai

The user reported "LGTM when it zoom" for the current dirty candidate. This is
recorded as passing human visual evidence for the zoom portion of PH-MT01. It
does not establish the browser/version, viewport set, long-content behavior, or
keyboard-at-200% steps, so PH-MT01 remains BLOCKED with partial passing evidence.
The manual totals remain 0 complete PASS, 0 human-execution FAIL, 8 BLOCKED,
and 0 N/A; PH-MT01 now contains the partial user result and PH-MT02-PH-MT08
remain wholly unexecuted.

## PH-MT02 keyboard/pointer execution update: 2026-10-21 Asia/Shanghai

At the user's request, PH-MT02 was executed through an interactive Playwright
browser session at `1440x900` and `375x812`. The case is FAIL under PH-VF03:
desktop forward tabbing escapes the open dialog because the trap's configured
last element is a hidden mobile social link rather than the last visible
desktop link, and outside-pointer closure leaves focus on `body` at both widths.
Escape restoration, mobile boundary wrapping, desktop menu/search exclusivity,
and a safely intercepted single link activation pass.

Current manual totals are 0 complete PASS, 1 FAIL, 7 BLOCKED, and 0 N/A.
PH-MT01 remains BLOCKED with partial passing zoom evidence, PH-MT02 is FAIL,
and PH-MT03-PH-MT08 remain unexecuted/BLOCKED. Forge correction and focused
Vera retesting are required before manual verification can continue to review.

## PH-VF03 correction update: 2026-10-21 Asia/Shanghai

Forge corrected the two PH-MT02 failures without changing the approved public
API. The focus trap now uses only currently visible focusable controls, and
outside closure is handled after the browser's click default action so focus
restoration to the menu trigger persists. Regression coverage exercises both
focus-boundary directions and outside-close restoration at `375px` and
`1440px`. The focused unit/Playwright checks, full `npm run check`, all 26
configured Playwright cases, package inspection, and diff whitespace check pass.

This implementation evidence does not overwrite the independent manual result.
PH-MT02 remains FAIL under PH-VF03 until Vera retests the corrected candidate;
the totals therefore remain 0 complete PASS, 1 FAIL, 7 BLOCKED, and 0 N/A.

## PH-VF03 independent correction revalidation: 2026-10-21 Asia/Shanghai

Vera independently repeated PH-MT02 against the corrected dirty candidate at
`1440x900` and `375x812` with the repository-installed Playwright Chromium.
Visible forward/backward focus containment, Escape and outside-click closure,
trigger-focus and body-scroll restoration, desktop search/menu mutual
exclusion, mobile contained search, and safely intercepted single keyboard link
activation all pass. The focused 6-case Playwright selection, 13 component
tests, full quality gate, all 26 configured Chromium cases, and package dry-run
also pass. Details are in
`execution/10e_ph_vf03_correction_revalidation_2026-10-21.md`.

The earlier PH-MT02 FAIL remains preserved above as historical evidence, but
its current retest status is PASS and PH-VF03 is resolved. Current manual totals
are 1 PASS, 0 FAIL, 7 BLOCKED, and 0 N/A. PH-MT01 remains BLOCKED with partial
zoom evidence; PH-MT03-PH-MT08 remain BLOCKED, including screen-reader QA and
the required latest-two native browser matrix.

## Remaining-case verification update: 2026-10-22 Asia/Shanghai

Vera independently refreshed the exact dirty candidate and completed every
remaining case that can be executed safely with local synthetic data and the
available browser/package infrastructure. PH-MT04, PH-MT05, PH-MT06, and
PH-MT08 now PASS. PH-MT01 gained fresh five-width and production-dimension
evidence but remains BLOCKED because the user's 200% zoom approval did not
include browser/version metadata or explicit keyboard-at-zoom evidence.
PH-MT03 remains BLOCKED because no real screen reader is available. PH-MT07
remains BLOCKED because bundled Chromium is not evidence for the approved
latest-two branded Chrome, Edge, Firefox, and native Safari matrix.

Current totals are **5 PASS, 0 FAIL, 3 BLOCKED, and 0 N/A**. The fresh automated
regression evidence is `npm run check` PASS (13/13 tests, two consumer fixtures,
Storybook and Next.js builds), `npm run test:e2e` PASS (26/26), and
`npm run pack:check` PASS (37 files; 21.6 kB packed; 76.3 kB unpacked). Details
are in `execution/10f_remaining_manual_verification_2026-10-22.md`.

Overall verification remains BLOCKED and cannot be handed to Argus as fully
passing. The next owner is human accessibility/cross-browser QA with a real
screen reader, native 200% zoom metadata/keyboard execution, and both current
supported releases of branded Chrome, Edge, Firefox, and Safari. No Git or
external handoff action was performed.

## Owner waiver and Windows zoom update: 2026-10-22 Asia/Shanghai

The user confirmed that the keyboard-at-200%-zoom check was good on Windows in
Chrome and Edge. Installed versions were recorded as Chrome `155.0.8059.85` and
Edge `155.0.4283.62`; combined with report 10f's five-width/long-content
evidence, PH-MT01 is now PASS.

The user clarified that the accessibility capture used a browser screen
recorder rather than a real screen reader, then explicitly instructed that the
check be overridden. Under PH-A20, PH-MT03 is therefore N/A/WAIVED with accepted
risk, not PASS. The absence of real announcement testing remains visible in the
record. Current totals are **6 PASS, 0 FAIL, 1 BLOCKED, and 1 N/A**. PH-MT07 is
the sole remaining verification blocker because the approved latest-two native
Chrome/Edge/Firefox/Safari matrix has not been executed.

## Installed-browser compatibility update: 2026-10-22 Asia/Shanghai

Vera ran all 26 desktop/mobile Portal Header cases against installed Chrome
`155.0.8059.85` and all 26 against installed Edge `155.0.4283.62`; all 52
passed. Installed Firefox `152.0.4` could not establish Playwright's required
automation protocol and exited before test execution, so its 26 attempts are
infrastructure BLOCKED rather than product failures. Second-version binaries
and native Safari remain unavailable. PH-A21 subsequently accepts the passing
configured Chromium and installed Chrome/Edge evidence as the delivery matrix.
PH-MT07 is therefore PASS for the revised scope, with deferred coverage retained
as residual risk. Current totals are **7 PASS, 0 FAIL, 0 BLOCKED, and 1 N/A**.

## PH-A22 review-adjustment revalidation: 2026-10-22 Asia/Shanghai

Vera independently validated the component-root text-token correction in both
configured desktop and mobile projects. The section label, menu control, visible
social link, and navigation link retained the approved white default and changed
to the injected root token value. The full quality gate, 28/28 configured
Playwright cases, 37-file package dry run, matching source/embedded/built logo
hashes, built CSS inspection, unused-token scan, and whitespace check pass as
recorded in `execution/12b_review_adjustment_revalidation_2026-10-22.md`.

This approved review adjustment adds no new human-only case and does not alter
earlier owner results or waivers. Current totals remain **7 PASS, 0 FAIL,
0 BLOCKED, and 1 N/A/waived** under PH-A20/PH-A21. The QA reference remains in
the repository; the adjustment evidence is prepared for Argus through Atlas and
has not been externally sent.

## Final verification refresh: 2026-10-22 Asia/Shanghai

Vera independently confirmed PH-A21 across the approval log, requirements,
PH-NFR07, test plan, this PH-MT07 record, acceptance criteria, changelog, WBS,
state, and reports 10h/10i. The current dirty candidate again passed
`npm run check` (13/13 unit/accessibility tests, two consumer fixtures,
Storybook, and Next.js 16.3.8), `npm run test:e2e` (26/26 configured Chromium
desktop/mobile cases), and `npm run pack:check` (37 files; 21.6 kB packed;
76.3 kB unpacked). Report 10h remains the evidence for the separate 52/52
installed Windows Chrome/Edge run.

PH-MT07 remains PASS only for the explicitly revised PH-A21 delivery matrix.
Firefox, Safari, second-version, and real screen-reader coverage remain deferred
or waived residual risks and are not represented as executed. PH-AC18 now passes
and the approved-scope verification handoff to Argus is ready; no Git or release
action was performed.
