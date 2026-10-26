# Execution report 05: Ads component implementation plan

## Executive summary

Requirements are approved by ADS-A04. This plan proposes one release-complete feature delivery for a configurable, SSR-safe `AdSlot` with semantic MREC/leaderboard/custom rectangular formats and a GPT/GAM adapter. Consumers provide all active-rule unit paths and sizes and own GPT bootstrap, eligibility, and targeting policy. Implementation remains blocked until separate development approval.

## Workflow context

- Project: Ads component.
- Stage: Development planning.
- Primary role: Athena; Atlas coordinates the development-approval gate.
- Approved requirements: ADS-R01–ADS-R12, ADS-AC01–ADS-AC18, ADS-NFR01–ADS-NFR08, ADS-A03, and ADS-A04.
- Intended endpoint: validated and independently reviewed release-complete change set ready for separately approved commit/push/PR handoff. Merge, tag, release, and deployment are not included.
- Planning depth: full feature path because this adds a public package API, browser provider lifecycle, privacy boundary, responsive behavior, Storybook/catalog documentation, and release impact.

## Previous stage summary

Reports 01–04 established the repository/reference analysis, corrected the initial branch plan, confirmed consumer-owned sizes, and obtained approval of the first-release requirements baseline.

## Current stage objective

Define exact delivery units, files, API behavior, tests, manual QA, release impact, sequencing, owners, risks, and exit evidence for development approval.

## Initial readiness and branch decision

| Item | Evidence / decision | Status |
| --- | --- | --- |
| Working repository | `D:\gno-node-projects\gno-shared-components-v2`, `feature/ads-component`, HEAD `a546c6858312b4d3a168009efad37da276afe9b1` plus recorded ads-spec worktree | Ready for approval |
| Target comparison | `origin/master` `f4d55798454fc632f8a251287c7f9e676ed148e8`, merge base `c453774`; branch is 3 behind and 2 ahead | Reviewed |
| Master-only impact | Workflow/release documentation and templates; no `app/`, `packages/ui/src/`, test, package-manifest, or lockfile source overlap | No source blocker |
| Branch synchronization | Do not merge/rebase during development planning or implementation. Develop on current branch, honor the newer release-complete policy inspected from `origin/master`, and reassess target conflicts before commit/PR. Any merge/rebase remains a separate Git decision. | Proposed |
| Existing unrelated worktree | Untracked `.playwright-mcp/` | Preserve and exclude |
| Runtime/tooling | Node 26.10.0, npm 11.19.1, React 19.2.8, Next.js 16.4.2, TypeScript 5, Vitest 4, Storybook 10.6.3, Playwright | Ready |
| Framework guidance | Repository JavaScript-framework skill plus installed Next.js Server/Client, `use client`, `Script`, and third-party guidance | Selected |
| New dependencies | None planned | Ready |

## Approved implementation contract

### Configuration

- `format` is `"mrec" | "leaderboard" | "custom"` and supplies semantics/styling/diagnostics only.
- Rules cover the viewport from width 0 without overlap or gaps.
- Active rules require positive integer `minWidth`/optional `maxWidth`, a non-empty full `adUnitPath`, and a non-empty immutable list of positive integer `[width, height]` sizes.
- Disabled rules require `enabled: false` and omit unit path/sizes.
- Reserve is the default empty behavior and requires an explicit consumer `reservedSize`; collapse is opt-in and may omit it.
- Targeting values are strings or immutable string arrays. Empty keys/values are rejected; caller data is never mutated.

### Component lifecycle

- `AdSlot` is a narrow `"use client"` entry point but produces SSR-safe wrapper/label/reserved-space markup without provider access.
- Required props are `config`, `enabled`, and `provider`; optional props are `label`, React `placeholder`, `slotId`, `className`, and `onStateChange`.
- A sanitized React `useId` supplies the default stable unique element ID.
- `enabled={false}` or a disabled responsive rule produces no provider call.
- A 100 ms resize debounce compares a stable active-rule signature. A signature change destroys the prior owned handle before at most one replacement.
- Generation/cancellation guards handle Strict Mode and queued provider completion after cleanup.
- State is `idle`, `loading`, `filled`, `empty`, or `error`; placeholders clear on every terminal result. Empty/error applies the configured reserve/collapse behavior.

### GPT adapter

- Export a factory receiving a consumer-supplied initialized GPT-compatible object; do not read `window.googletag` inside the package.
- Queue calls through `googletag.cmd`, handle `defineSlot` failure, add the pubads service, apply validated targeting, register/filter `slotRenderEnded`, call `display`, remove listeners, and destroy only the owned slot.
- Do not inject scripts, initialize services, set service-level lazy loading, hard-code inventory/targeting, use jQuery, or expose arbitrary HTML/script URLs.

## Delivery units and affected files

All units form one component delivery and are not individually release-ready.

### DU-1 — Typed configuration and responsive resolver

Requirements: ADS-R01, ADS-R02, ADS-R05, ADS-R08, ADS-R09.

Files:

- new `packages/ui/src/components/ad-slot/types.ts`
- new `packages/ui/src/components/ad-slot/resolve-rule.ts`
- new `packages/ui/src/components/ad-slot/resolve-rule.test.tsx`

Work:

- define immutable public types and discriminated active/disabled/reserve/collapse contracts;
- validate format, keys, rule coverage/order, bounds, unit paths, sizes, targeting, and reservation;
- return deterministic rule/signature results without accessing browser globals;
- test valid boundaries plus missing, empty, overlapping, gapped, malformed, and mutation-negative cases.

Exit: resolver/type tests pass and active rules cannot omit consumer sizes/unit paths.

### DU-2 — AdSlot rendering and lifecycle

Requirements: ADS-R01, ADS-R04, ADS-R06–ADS-R10.

Files:

- new `packages/ui/src/components/ad-slot/ad-slot.tsx`
- new `packages/ui/src/components/ad-slot/ad-slot.test.tsx`
- modify `packages/ui/src/styles.css`

Work:

- implement the client component, semantic labeled region, reserved/collapse classes, placeholder, state reporting, stable ID, and class hook;
- implement client-only initial rule resolution, 100 ms resize debounce, generation guards, destroy-before-replace, terminal states, and unmount cleanup;
- use a fake provider to cover SSR rendering, disabled state, fill/no-fill/error, config/provider replacement, multiple-instance isolation, resize bursts, Strict Mode, stale async completion, and accessibility.

Exit: component tests demonstrate one owned handle, no server/disabled request, deterministic layout state, and no serious/critical axe findings.

### DU-3 — GPT/GAM adapter

Requirements: ADS-R03–ADS-R05, ADS-R07–ADS-R10.

Files:

- new `packages/ui/src/components/ad-slot/gpt-provider.ts`
- new `packages/ui/src/components/ad-slot/gpt-provider.test.tsx`
- new `packages/ui/src/components/ad-slot/index.ts`

Work:

- define the minimum typed GPT-compatible surface without a runtime dependency;
- implement queued define/target/display/event/destroy behavior and listener ownership;
- cover ready/late queues, `defineSlot` null, targeting, event filtering, listener removal, repeated cleanup, and isolation;
- export component, factory, resolver/validator as approved, and public types from the component entry.

Exit: fake-GPT contract tests pass with no global/service/script ownership in package code.

### DU-4 — Package, Storybook, catalog, and consumer integration

Requirements: ADS-R01, ADS-R08, ADS-R10–ADS-R12.

Files:

- modify `packages/ui/src/index.ts`
- new `packages/ui/src/components/ad-slot/ad-slot.stories.tsx`
- modify `app/catalog/page.tsx`
- new `app/catalog/ad-slot-preview.tsx`
- modify `tests/e2e/showcase.spec.ts`
- new `tests/consumers/ad-slot-typescript/main.tsx`
- new `tests/consumers/ad-slot-javascript/main.jsx`
- modify `scripts/check-consumer-fixtures.mjs`
- new `scripts/check-ad-slot-size.mjs`
- modify root `package.json` to expose/enforce the ads-size check

Work:

- publish the entry through the existing root export; no new package subpath is required;
- add fake-provider stories for MREC, leaderboard, custom, disabled, loading, filled, empty reserve/collapse, error, and responsive configurations;
- add catalog configuration/ownership guidance and a fake preview that never loads GPT;
- add TypeScript/JavaScript build fixtures and browser assertions for state, responsive replacement, layout, accessibility, and zero production ad-network traffic;
- measure compiled ads JavaScript only and enforce the approved 20 KiB uncompressed limit excluding React/GPT.

Exit: exports, stories, catalog, consumer fixtures, browser coverage, docs coverage, and size budget pass.

### DU-5 — Release-complete documentation and package candidate

Requirements: ADS-R10–ADS-R12 and repository release policy.

Files:

- modify `packages/ui/README.md`
- modify `docs/consumer-setup.md`
- modify root `README.md` and `app/page.tsx` where package/component/version guidance is displayed
- modify `CHANGELOG.md`
- modify root `package.json`, `packages/ui/package.json`, and `package-lock.json` to proposed version `1.3.0`
- update `specs/2026/ads-component/consumer_setup.md`, state/evidence, and execution records as actual behavior is completed
- create `specs/2026/ads-component/manual_testing.md` during verification

Work:

- document client-boundary/provider bootstrap, consumer-owned unit paths/sizes/eligibility/targeting, responsive rules, empty behavior, and exclusions;
- record minor SemVer impact, no required migration for existing consumers, and adoption steps for new consumers;
- keep root/package/lockfile versions aligned in the release-complete candidate before final verification/review;
- populate repeatable manual QA cases without claiming execution.

Exit: one release-complete `1.3.0` candidate contains all tracked source, stories, catalog, docs, migration/adoption notes, versions, lockfile, and changelog changes before Vera/Argus.

## Manual QA plan

Destination: `specs/2026/ads-component/manual_testing.md` using the repository template. Recipient: repository owner plus monetization/ad-operations QA; named individual pending assignment. Handoff remains **Prepared**, not Sent or Executed, until authorized and actually performed.

Required cases:

1. SSR/catalog load creates no ad request and no browser error.
2. Eligibility false and disabled rules create no provider slot.
3. Consumer-configured MREC reaches filled state with stable reserved layout.
4. Leaderboard crosses approved fixture breakpoints with one destroy then one create.
5. Custom/footer fixture remains disabled below its configured range and activates above it.
6. No-fill reserve and opt-in collapse produce the documented layout.
7. Provider error clears loading UI and remains isolated.
8. Multiple slots mount/unmount without cross-destruction.
9. Label/region semantics, 200% zoom, keyboard traversal, and focus behavior remain acceptable.
10. Browser network log contains no production GPT/AllAccess request in docs/test fixtures.

Manual checks supplement automated tests. Required unrun cases remain BLOCKED and prevent release readiness.

## Verification plan

Forge runs focused checks during construction; Vera later records exact revision/environment/results for the release-complete diff.

Planned commands from the repository root:

```text
npm run typecheck
npm run lint
npm run test
npm run test:consumers
npm run size:ads
npm run docs:check
npm run build-storybook
npm run build
npm run pack:check
npm run test:e2e
npm run check
```

Additional evidence:

- static search proving no production network ID, GNO unit name, GPT/AllAccess script injection, `window.googletag`, or consent-storage access in package source;
- package tarball inspection for public JS/types/styles and absence of test/story/live-network artifacts;
- network trace proving fake-only Storybook/catalog/e2e behavior;
- manual QA results at the tested revision.

## Stage selection

- Adoption refresh, requirements, design, implementation, unit/component tests, verification, independent review, correction loop if needed, and release preparation are selected.
- Database/API migration, backend integration, deployment, and rollback execution are N/A because this is a client package component with no schema/service change.
- Manual QA is required, not N/A.
- Commit, push, PR, merge, and tag actions remain separate approval gates. The user/repository owner performs the final merge.
- Independent review must be performed by Argus or a human who did not implement the change; the implementing session cannot claim independence.

## Risks and mitigations

| Risk | Mitigation / evidence |
| --- | --- |
| Queued GPT work completes after cleanup | generation token plus immediate destruction of stale handles; fake delayed-queue tests |
| Strict Mode duplicates a slot | mount/cleanup/remount tests and one-handle invariant |
| Resize creates duplicate impressions | 100 ms debounce, stable signature, destroy-before-create, browser/unit burst tests |
| Consumer passes invalid inventory config | pure structural validation, error state/callback, no provider request |
| Package accidentally owns global GPT policy | minimal injected adapter, static negative checks, no script/service methods in slot API |
| Layout shift/no-fill ambiguity | required `reservedSize` for default reserve; explicit collapse contract and visual QA |
| Live ad traffic in public docs/tests | fake provider only plus network assertion |
| Master advanced during feature work | compare target before commit/PR; do not merge/rebase without separate Git authorization |
| Release files added after review | complete version/changelog/docs/catalog before Vera/Argus, following newer `origin/master` policy |

## Definition of done

- ADS-AC01–ADS-AC18 and approved NFR targets have passing evidence at one release-complete revision.
- Component, GPT adapter, public types/exports/styles, tests, Storybook, catalog, consumer fixtures/docs, manual QA record, version `1.3.0`, lockfile, and changelog are aligned.
- No production ad traffic or embedded inventory/policy exists in package/test/documentation runtime.
- Required manual QA passes.
- Independent review has no open required findings; any correction loop was separately approved and revalidated.
- Commit/push/PR are only prepared after their separate approvals. Merge/release are not claimed.

## Approval status

Pending explicit development approval. Requirements approval ADS-A04 does not authorize implementation.

## Next stage

Upon explicit development approval, route to Forge with JavaScript-framework guidance for DU-1 through DU-5. Otherwise amend this plan and renew development approval.
