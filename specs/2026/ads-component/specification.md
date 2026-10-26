# Specification: Ads component

## Business intent

Consumers need a reusable ad-slot component for common MREC and leaderboard placements instead of duplicating layout and ad-server wiring. The `news` repository is a behavior reference only; it is not a consumer integration target for this project.

## Scope

- A standalone `AdSlot` component with semantic `mrec`, `leaderboard`, and approved `custom` standard rectangular display formats.
- A provider-adapter boundary; GPT/GAM is the recommended first adapter.
- Consumer configuration for responsive ad-unit paths/sizes, targeting, eligibility, reserved/collapse behavior, placeholder behavior, and ad label.
- Client-only slot registration/display/cleanup with SSR-safe rendering.
- Dedicated Storybook stories/controls for every supported format and its meaningful loading, filled, empty, error, and responsive states.
- Consumer guidance and package examples using an injected/mock provider during development and tests.

## Out of scope for the initial proposal

- Video ads/IMA, interstitials, out-of-page ads, pushdowns, skyscraper-specific behavior, native ads, buttons, sponsorship overlays, refresh scheduling, or an ad campaign-management UI.
- Loading a consumer's GPT/GAM or AllAccess scripts or configuring application-wide GPT services automatically.
- GNO production ad-unit paths, zone IDs, publisher IDs, site targeting, or campaign data in package defaults.
- Consumer source changes, production ad requests, monetization policy, or ad-server configuration changes.

## Confirmed intent and recommended decisions

- Confirmed by user: review the `news` repository and create a shared ad component spec covering MREC and leaderboard.
- Confirmed: consumers configure the full size list for every active responsive ad-unit rule; the package provides no operational MREC/leaderboard size defaults.
- Recommended: one `AdSlot` API with MREC/leaderboard semantic formats, custom standard display rules, and one GPT/GAM adapter for the first release.
- Recommended: consumers initialize the ad provider once; the component registers/renders/destroys individual slots and never loads a script itself.
- Reference examples may show MREC sizes such as `[300x250, 250x250]` and leaderboard sizes observed in `news`, but those values are never applied unless supplied by the consumer.
- Approved by ADS-A04: GPT/GAM only, include custom standard rectangular display, consumer-owned provider/eligibility/targeting, reserve-by-default with opt-in collapse, and exclude specialized ad lifecycles.

## Success measures

- MREC, leaderboard, and approved custom standard display slots render through one documented component contract with consumer-owned inventory configuration.
- Responsive selection and lifecycle behavior are deterministic, including no-fill and provider failure.
- SSR never reads browser globals or registers a live slot; tests never issue production ad requests.
- Each rendered slot is unique, labeled, and cleaned up without disturbing other slots.
- The package does not embed GNO inventory IDs, partner scripts, or user targeting defaults.

## Approval status

Requirements are approved by ADS-A04. Development approval remains pending; no implementation is authorized.
