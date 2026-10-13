# Specification: Ads component

## Business intent

Consumers need a reusable ad-slot component for common MREC and leaderboard placements instead of duplicating layout and ad-server wiring. The `news` repository is a behavior reference only; it is not a consumer integration target for this project.

## Scope

- A standalone `AdSlot` component with `mrec` and `leaderboard` format presets.
- A provider-adapter boundary; GPT/GAM is the recommended first adapter.
- Consumer configuration for ad-unit path, responsive sizes, targeting, lazy loading, placeholder behavior, and ad label.
- Client-only slot registration/display/cleanup with SSR-safe rendering.
- Dedicated Storybook stories/controls for both formats and their meaningful loading, filled, empty, error, and responsive states.
- Consumer guidance and package examples using an injected/mock provider during development and tests.

## Out of scope for the initial proposal

- Video ads/IMA, interstitials, pushdowns, skyscrapers, native ads, buttons, sponsorship overlays, or an ad campaign-management UI.
- Loading a consumer's GPT/GAM or AllAccess scripts automatically.
- GNO production ad-unit paths, zone IDs, publisher IDs, site targeting, or campaign data in package defaults.
- Consumer source changes, production ad requests, monetization policy, or ad-server configuration changes.

## Confirmed intent and recommended decisions

- Confirmed by user: review the `news` repository and create a shared ad component spec covering MREC and leaderboard.
- Recommended: one `AdSlot` API with format presets, and one GPT/GAM adapter for the first release.
- Recommended: consumers initialize the ad provider once; the component registers/renders/destroys individual slots and never loads a script itself.
- Proposed MREC preset: `[300x250, 250x250]`, with `[336x280]` added at widths of 1200 px or more, matching the reference global size configuration. The separate 320x270 AllAccess wrapper remains a distinct unresolved provider/format.
- Proposed leaderboard preset: use consumer-supplied desktop/mobile unit paths and the observed reference size sets, with configurable breakpoints.
- Exact provider scope, MREC sizes, collapse behavior, and privacy/targeting policy remain open for requirements review.

## Success measures

- MREC and leaderboard slots render through one documented component contract with consumer-owned inventory configuration.
- Responsive selection and lifecycle behavior are deterministic, including no-fill and provider failure.
- SSR never reads browser globals or registers a live slot; tests never issue production ad requests.
- Each rendered slot is unique, labeled, and cleaned up without disturbing other slots.
- The package does not embed GNO inventory IDs, partner scripts, or user targeting defaults.

## Approval status

This is a specification proposal only. Requirements and development approval are pending; no implementation is authorized.
