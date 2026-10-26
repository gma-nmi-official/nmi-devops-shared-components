# Manual testing: Ads component

## Handoff

- Status: **Executed — PASS**.
- Prepared: 2026-10-25, Asia/Shanghai.
- Executed: 2026-10-25 by Codex acting as Vera, using Playwright-driven Chromium inspection against the local production build.
- Target: `feature/ads-component`, baseline `a546c6858312b4d3a168009efad37da276afe9b1` plus the current ads-component working-tree diff.
- Recipient: repository owner and monetization/ad-operations QA; named tester pending.
- Environment: local production build and Storybook, current supported Chromium desktop (1440 × 900) and mobile (375 × 812).
- Safety: use only the catalog/Storybook fake provider. Do not add a live GPT script, production inventory path, or real targeting data.

Manual checks supplement the automated suite. `BLOCKED` cases remain release blockers even when related automated coverage passes.

## Setup

1. Run `npm ci` if dependencies are not installed.
2. Run `npm run build` and `npm run start -- -p 3100`.
3. Open `http://127.0.0.1:3100/catalog` and browser developer tools.
4. Keep the Network panel recording with cache disabled; filter for `doubleclick`, `googlesyndication`, `googletagservices`, `gpt`, and `allaccess`.
5. For supported-state inspection, run `npm run build-storybook` and serve the generated Storybook, or use the existing repository Storybook workflow.

## Reference-derived sample values

These samples map the supported rectangular formats found in
`C:\laragon\www\news` to the shared component contract. Use them with the fake
provider below for normal manual QA. A fake provider does not contact GAM even
when a reference path appears in the configuration.

`GNO_TEST_*` paths were observed in the reference code, but their continued GAM
availability is not guaranteed. Confirm every inventory path with Ad Operations
before using `createGptAdProvider`. The footer and skyscraper samples contain
production or legacy reference names and are **fake-provider-only** unless Ad
Operations explicitly approves a live staging request.

```tsx
import {
  AdSlot,
  type AdPlacementConfig,
  type AdProvider,
} from "nmi-devops-shared-components";

export const referenceLeaderboard: AdPlacementConfig = {
  key: "manual-reference-leaderboard",
  format: "leaderboard",
  reservedSize: [970, 90],
  targeting: {
    site_id: "GMA_News_Online",
    ad_pt: "News_Manual_Test",
    ad_pos: "Test_Leaderboard_1",
  },
  rules: [
    {
      minWidth: 0,
      maxWidth: 767,
      adUnitPath: "/344684475/GNO_TEST_Mobile_Leaderboard",
      sizes: [[320, 50], [320, 100]],
    },
    {
      minWidth: 768,
      maxWidth: 999,
      adUnitPath: "/344684475/GNO_TEST_Desktop_Leaderboard1",
      sizes: [[728, 90]],
    },
    {
      minWidth: 1000,
      adUnitPath: "/344684475/GNO_TEST_Desktop_Leaderboard1",
      sizes: [[970, 90], [728, 90]],
    },
  ],
};

export const referenceMrec: AdPlacementConfig = {
  key: "manual-reference-mrec",
  format: "mrec",
  reservedSize: [336, 280],
  targeting: {
    site_id: "GMA_News_Online",
    ad_pt: "News_Manual_Test",
    ad_pos: "Test_Mrec_1",
    keyword: ["manual-test"],
  },
  rules: [
    {
      minWidth: 0,
      maxWidth: 767,
      adUnitPath: "/344684475/GNO_TEST_Mobile_Mrec1",
      sizes: [[300, 250], [336, 280], [250, 250], [300, 600], [320, 480]],
    },
    {
      minWidth: 768,
      adUnitPath: "/344684475/GNO_TEST_Desktop_Mrec1",
      sizes: [[300, 250], [336, 280], [250, 250], [300, 600]],
    },
  ],
};

// Reference footer behavior: disabled through 1000 px and active above it.
// Fake-provider-only until Ad Operations approves this production inventory.
export const referenceFooterLeaderboard: AdPlacementConfig = {
  key: "manual-reference-footer-leaderboard",
  format: "leaderboard",
  reservedSize: [970, 250],
  rules: [
    { minWidth: 0, maxWidth: 1000, enabled: false },
    {
      minWidth: 1001,
      adUnitPath: "/344684475/GNO_News_Desktop_footer",
      sizes: [[728, 90], [970, 90], [970, 250]],
    },
  ],
};

export const referenceFilmstrip: AdPlacementConfig = {
  key: "manual-reference-filmstrip",
  format: "custom",
  reservedSize: [300, 600],
  rules: [
    {
      minWidth: 0,
      adUnitPath: "/344684475/GNO_TEST_Desktop_Mrec1",
      sizes: [[300, 600]],
    },
  ],
};

// The component supports the rectangular 160x600 slot, not any specialized
// skyscraper placement behavior. Fake-provider-only until inventory approval.
export const referenceSkyscraper: AdPlacementConfig = {
  key: "manual-reference-skyscraper",
  format: "custom",
  reservedSize: [160, 600],
  rules: [
    { minWidth: 0, maxWidth: 1023, enabled: false },
    {
      minWidth: 1024,
      adUnitPath: "/344684475/GNO_E16_Skyscraper_1",
      sizes: [[160, 600]],
    },
  ],
};
```

### Safe fake providers

Use these providers to exercise all component states without loading GPT or
making an ad-network request:

```tsx
export function createManualTestProvider(
  result: "filled" | "empty" | "error",
): AdProvider {
  return {
    createSlot(request) {
      window.setTimeout(() => {
        request.onStateChange(
          result,
          result === "error" ? new Error("Manual provider failure") : undefined,
        );
      }, 500);

      return { id: request.elementId };
    },
    destroySlot() {},
  };
}

export const loadingProvider: AdProvider = {
  createSlot: (request) => ({ id: request.elementId }),
  destroySlot() {},
};
```

Example harness:

```tsx
export function ManualAdHarness() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <AdSlot
        config={referenceLeaderboard}
        enabled
        provider={createManualTestProvider("filled")}
      />
      <AdSlot
        config={referenceMrec}
        enabled
        provider={createManualTestProvider("empty")}
      />
      <AdSlot
        config={{ ...referenceMrec, emptyBehavior: "collapse" }}
        enabled
        provider={createManualTestProvider("empty")}
      />
      <AdSlot
        config={referenceFilmstrip}
        enabled
        provider={createManualTestProvider("error")}
      />
      <AdSlot
        config={referenceSkyscraper}
        enabled
        provider={loadingProvider}
        placeholder="Waiting for the fake provider…"
      />
    </div>
  );
}
```

### Unsupported reference formats

Do not create sample `AdPlacementConfig` values for interstitial, outstream or
video, pushdown, skinning, native/AllAccess, or refresh behavior. Those formats
use materially different provider and page lifecycles and are intentionally not
supported by this `AdSlot` release.

## Cases

| ID | Requirements | Steps | Expected result | Result | Tester/date | Evidence/notes |
| --- | --- | --- | --- | --- | --- | --- |
| ADS-MT01 | ADS-R08, ADS-AC12, ADS-AC13 | Load `/catalog` directly, reload once, and inspect Console/Network before scrolling. | Page renders without browser errors; no live ad-network or AllAccess request occurs. | PASS | Codex/Vera, 2026-10-25 | Production catalog rendered its filled fake-provider preview. Console reported 0 errors. The ad-network/AllAccess Network filter returned no requests. |
| ADS-MT02 | ADS-R09, ADS-AC14 | In the Ad Slot Storybook story, select `ConsumerDisabled`; inspect state and Network. Then view a width where the leaderboard rule is disabled. | State remains idle and no provider display activity or network request occurs. | PASS | Codex/Vera, 2026-10-25 | `ConsumerDisabled` remained `idle` with no provider content. `Leaderboard` at 375 px also remained `idle`; the monitored ad-network filter stayed empty. |
| ADS-MT03 | ADS-R02, ADS-R04, ADS-R06 | View `Mrec` at desktop width and inspect its accessible region and dimensions. | Fake result reaches filled; region is named Advertisement; 300 × 250 space remains reserved without a layout jump. | PASS | Codex/Vera, 2026-10-25 | Story reached `filled`, exposed label `Advertisement`, and measured 301.6 × 251.6 px including the 0.8 px border on each edge (300 × 250 content). |
| ADS-MT04 | ADS-R02, ADS-R04 | View `Leaderboard`, resize from mobile to tablet and then wide desktop, waiting at least 150 ms after each resize. | Mobile is disabled; tablet and desktop activate their configured rules; no duplicate visible slot or console error occurs. | PASS | Codex/Vera, 2026-10-25 | 375 px: `idle`; 900 px and 1440 px: `filled`. Exactly one slot remained with the same element ID, no horizontal overflow, and no console error. |
| ADS-MT05 | ADS-R01, ADS-R02, ADS-AC16 | View `CustomDisplay`, then change the viewport below and above its configured range if controls permit. | Custom rectangular placement follows only its explicit rule and does not infer MREC/leaderboard sizes. | PASS | Codex/Vera, 2026-10-25 | Explicit custom 320 × 100 placement was `idle` at 375 px and `filled` at 900 px; measured 321.6 × 101.6 px including border and had no horizontal overflow. |
| ADS-MT06 | ADS-R06, ADS-R07 | Compare `ReservedEmpty` and `CollapsedEmpty`. | ReservedEmpty keeps the configured footprint; CollapsedEmpty removes it only after the empty result; neither shows a broken frame. | PASS | Codex/Vera, 2026-10-25 | Both reached `empty`. Reserved measured 301.6 × 251.6 px including border; collapsed had the collapsed class and 0 px height. Neither overflowed. |
| ADS-MT07 | ADS-R07, ADS-R12 | View `Loading` and `ProviderError`. | Loading shows only the configured placeholder; ProviderError clears loading presentation, exposes error state, and does not affect other stories. | PASS | Codex/Vera, 2026-10-25 | Loading exposed `loading` with `Waiting for the fake provider…`; error exposed `error` with no placeholder. Navigating afterward to MREC reached `filled`; console remained error-free. |
| ADS-MT08 | ADS-R04, ADS-AC07 | Open two MREC story instances, close/unmount one, then interact with or reload the other. | Removing one instance does not remove or corrupt the other. | PASS | Codex/Vera, 2026-10-26 | Corrected stable-provider harness: initially both slots were filled at creates 1 / destroys 0. After unmounting the first, its counter was creates 1 / destroys 1; the second remained filled with the same ID at creates 1 / destroys 0. No console error or horizontal overflow occurred. |
| ADS-MT09 | ADS-R06, ADS-NFR02 | At desktop and mobile widths, zoom to 200%, traverse the page by keyboard, and inspect `CustomLabel`. | No clipping or page-level horizontal overflow; ad region has the configured label and creates no unexpected focus stop. | PASS | Repository owner, 2026-10-25 | Repository owner confirmed the 200% zoom result as LGTM. Earlier Vera checks confirmed the `Sponsored placement` label, no unexpected tab stop, and no desktop/mobile horizontal overflow. |
| ADS-MT10 | ADS-R03, ADS-R09, ADS-AC13 | Repeat catalog and Storybook state checks while monitoring Network. | No production GPT/AllAccess request, production unit path, or real targeting value appears. | PASS | Codex/Vera, 2026-10-25 | Across catalog and Storybook state checks, the filter for doubleclick, googlesyndication, googletagservices, `gpt.js`, and AllAccess returned no request. Only synthetic Storybook paths and fake providers were exercised. |

## Completion

All ten manual cases pass for the corrected working-tree candidate. ADS-MT08 was rerun against the stable instrumented harness; the repository owner's ADS-MT09 zoom result remains valid because the corrections did not affect presentation.

### Defects and follow-up

- During ADS-MT03, Storybook's former centered layout collapsed the responsive component wrapper to approximately 3 px wide. The story metadata was corrected to use padded layout, and the affected stories were rebuilt and rechecked successfully.
- ADS-MT08's prior evidence was invalidated by ADS-REV03. The corrected `MultipleSlots` story uses stable providers/configs and reports per-slot create/destroy counts; the 2026-10-26 rerun passed without recreating or destroying the second slot.
- ADS-MT09 was closed by the repository owner's 200% zoom confirmation; its earlier label, focus, and overflow subchecks also passed.
