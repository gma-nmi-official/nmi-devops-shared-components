# Reference analysis: Ads component

## Repositories and files inspected

| Repository | Revision | Relevant files |
| --- | --- | --- |
| `C:\laragon\www\news` | `hotfix/GNO-21329` / `28d3312872ac7dee53215939faeeda50b0d37e87` (refreshed 2026-10-24) | `res/js/ads/ads_leaderboard.js`, `res/js/ads/footer_leaderboard_main.js`, `res/js/third_party/dfp.js`, `res/js/common_screen_sizes.js`, `res/js/gnoadscript.js`, `res/js/story/story.js`, `application/views/ads/mrect_ads_view.php`, `application/views/ads/mrect_ads_story_mobile.php`, `application/views/third_party/dfp.php`, `application/views/page_components/header_js_globals.php` |
| `gno-shared-components-v2` | `feature/ads-component` / `a546c6858312b4d3a168009efad37da276afe9b1` | `AGENTS.md`, workflow, package manifests, public exports, existing component/story/test/style conventions, installed Next.js 16.4.2 guidance, and branch diff against `origin/master` |

The `news` worktree is a read-only reference. Its local instructions require preserving CodeIgniter behavior and prohibit implementation during requirements analysis/planning.

## Observed ad loading and slot behavior

- `application/views/third_party/dfp.php` loads GPT (`gpt.js`), creates the `googletag.cmd` queue, enables single-request mode, and initializes GPT services. The shared component should not duplicate this global bootstrap by default.
- `res/js/third_party/dfp.js` exposes `loadAd`, defines slots with `googletag.defineSlot`, adds them to `googletag.pubads()`, applies keyword and custom targeting, then calls `googletag.display`.
- The GPT helper builds slot IDs and category counters, tracks ad-unit/size/keyword metadata on elements, supports lazy-loading configuration, and assigns targeting such as `ad_pt`, `ad_pos`, and `site_id`. Some behavior is specific to GNO inventory and should not be copied as package constants.
- GPT lazy loading in the reference is configured through `googletag.pubads().enableLazyLoad`, which is a service-level concern. It should not be modeled as an independent per-slot React prop.
- `res/js/ads/ads_leaderboard.js` selects desktop unit `GNO_News_Leaderboard_1` or mobile unit `GNO_News_MobileLeaderboard_1`. Desktop size sets are `[970x90, 728x90]`, narrowed to `[728x90]` for the reference's 993–1280 px desktop range. At widths up to 992 px it selects the mobile unit and `[320x100, 320x50]` sizes.
- `res/js/ads/footer_leaderboard_main.js` is a separate footer placement: it runs only above 1000 px, constructs a section-specific desktop unit, supplies `[728x90, 970x90, 970x250]`, applies section/page-type/order targeting, and requests lazy loading. Treat those sizes as a consumer configuration example, not a shared leaderboard default.
- `application/views/page_components/header_js_globals.php` sets `mrec_size` to `[300x250, 336x280, 250x250]` at widths of 1200 px or more and `[300x250, 250x250]` below that.
- `application/views/ads/mrect_ads_view.php` and `mrect_ads_story_mobile.php` instead render a 320x270 MREC wrapper and load `ads.allaccess.com.ph/deliverjs.nmi` with a consumer-provided zone ID. This is a distinct legacy provider path from GPT/GAM.
- GPT MREC classification distinguishes standard `mrec` from `grid_mrec` in some article/grid cases, based on unit naming, page targeting, and placeholder shape.
- The story reference inserts an MREC in the article content tree, cycles unit suffixes 1–4, and gives the first narrow-mobile MREC additional `300x600`/`320x480` sizes. Those are consumer placement/inventory rules, not safe shared defaults.
- The MREC templates use a visible “advertisement” label. The shared API should support an accessible, configurable label rather than hard-code locale copy.
- `dfp.js` mixes provider lifecycle, GNO naming/targeting policy, jQuery DOM insertion, global counters, and page exceptions. The shared design keeps only the provider lifecycle behind an adapter and does not port this function wholesale.

## Facts, assumptions, and recommendations

**Facts:** the reference uses two delivery patterns for MREC; leaderboards use GPT with responsive desktop/mobile units; GPT service loading is separate from placement helpers; ad-unit IDs, sizes, targeting, and slot naming are currently coupled to GNO inventory.

**Confirmed sizing boundary:** the first shared component may expose semantic `mrec`, `leaderboard`, and optional `custom` formats, but every active responsive rule receives its complete size list from the consumer. Reference sizes remain examples only.

**Recommendation:** implement GPT/GAM as the first provider adapter and let consumers load/configure GPT once. Keep AllAccess zone-script support out of the initial package until the monetization owner confirms it is required. Require consumers to provide all unit paths and size lists along with targeting, labels, eligibility, and empty behavior; keep GPT service-level lazy loading in the consumer bootstrap.

## Risks and open points

- Two different MREC size/provider patterns exist; a single default cannot be called “reference parity” without a monetization decision.
- The repository's ad unit paths and targeting values are production inventory details; none belong in a public shared package default.
- GPT is a browser-global queue and has slot lifecycle, unmount, responsive sizing, no-fill, and duplicate-slot risks. These need an adapter contract and a mock GPT test harness.
- Ads may receive user-consent or privacy-sensitive targeting. The component should accept approved targeting/eligibility from consumers and must not infer consent, collect user data, or define the site's ad policy.
- Ad blockers and no-fill responses must leave a deliberate placeholder/collapse result without breaking layout or unrelated content.
