# Reference analysis: Ads component

## Repositories and files inspected

| Repository | Revision | Relevant files |
| --- | --- | --- |
| `C:\laragon\www\news` | `feature/api-connectivity-checker` / `16c98484aeecdec2ba4552e5f5f834d029d7a7b4` | `res/js/ads/ads_leaderboard.js`, `res/js/ads/footer_leaderboard_main.js`, `res/js/third_party/dfp.js`, `res/js/common_screen_sizes.js`, `res/js/gnoadscript.js`, `application/views/ads/mrect_ads_view.php`, `application/views/ads/mrect_ads_story_mobile.php`, `application/views/ads/ads_view.php`, `application/views/ads/footer_leaderboard_main.php`, `application/views/third_party/dfp.php`, `application/views/page_components/header_js_registry.php`, `application/views/page_components/header_js_globals.php` |
| `gno-shared-components-v2` | `master` / `c580e40819842932fe9430cefddca92bf6525867` | `AGENTS.md`, package manifests, component foundation, existing component specifications |

The `news` worktree is a read-only reference. Its local instructions require preserving CodeIgniter behavior and prohibit implementation during requirements analysis/planning.

## Observed ad loading and slot behavior

- `application/views/third_party/dfp.php` loads GPT (`gpt.js`), creates the `googletag.cmd` queue, enables single-request mode, and initializes GPT services. The shared component should not duplicate this global bootstrap by default.
- `res/js/third_party/dfp.js` exposes `loadAd`, defines slots with `googletag.defineSlot`, adds them to `googletag.pubads()`, applies keyword and custom targeting, then calls `googletag.display`.
- The GPT helper builds slot IDs and category counters, tracks ad-unit/size/keyword metadata on elements, supports lazy-loading configuration, and assigns targeting such as `ad_pt`, `ad_pos`, and `site_id`. Some behavior is specific to GNO inventory and should not be copied as package constants.
- `res/js/ads/ads_leaderboard.js` selects desktop unit `GNO_News_Leaderboard_1` or mobile unit `GNO_News_MobileLeaderboard_1`. Desktop size sets are `[970x90, 728x90]`, narrowed to `[728x90]` for the reference's 993–1280 px desktop range. At widths up to 992 px it selects the mobile unit and `[320x100, 320x50]` sizes.
- `res/js/ads/footer_leaderboard_main.js` is a separate footer placement: it runs only above 1000 px, constructs a section-specific desktop unit, supplies `[728x90, 970x90, 970x250]`, applies section/page-type/order targeting, and requests lazy loading. Do not conflate this specialized placement with the general responsive leaderboard preset.
- `application/views/page_components/header_js_globals.php` sets `mrec_size` to `[300x250, 336x280, 250x250]` at widths of 1200 px or more and `[300x250, 250x250]` below that.
- `application/views/ads/mrect_ads_view.php` and `mrect_ads_story_mobile.php` instead render a 320x270 MREC wrapper and load `ads.allaccess.com.ph/deliverjs.nmi` with a consumer-provided zone ID. This is a distinct legacy provider path from GPT/GAM.
- GPT MREC classification distinguishes standard `mrec` from `grid_mrec` in some article/grid cases, based on unit naming, page targeting, and placeholder shape.
- The MREC templates use a visible “advertisement” label. The shared API should support an accessible, configurable label rather than hard-code locale copy.

## Facts, assumptions, and recommendations

**Facts:** the reference uses two delivery patterns for MREC; leaderboards use GPT with responsive desktop/mobile units; GPT service loading is separate from placement helpers; ad-unit IDs, sizes, targeting, and slot naming are currently coupled to GNO inventory.

**Assumption for the draft:** the first shared component exposes one `AdSlot` with `mrec` and `leaderboard` presets, while a provider adapter isolates GPT/GAM details.

**Recommendation:** implement GPT/GAM as the first provider adapter and let consumers load/configure GPT once. Keep AllAccess zone-script support out of the initial package until the monetization owner confirms it is required. Make all unit paths, dimensions, targeting, labels, and lazy-load behavior consumer configuration rather than package constants.

## Risks and open points

- Two different MREC size/provider patterns exist; a single default cannot be called “reference parity” without a monetization decision.
- The repository's ad unit paths and targeting values are production inventory details; none belong in a public shared package default.
- GPT is a browser-global queue and has slot lifecycle, unmount, responsive sizing, no-fill, and duplicate-slot risks. These need an adapter contract and a mock GPT test harness.
- Ads may receive user-consent or privacy-sensitive targeting. The component should accept approved targeting/eligibility from consumers and must not infer consent, collect user data, or define the site's ad policy.
- Ad blockers and no-fill responses must leave a deliberate placeholder/collapse result without breaking layout or unrelated content.
