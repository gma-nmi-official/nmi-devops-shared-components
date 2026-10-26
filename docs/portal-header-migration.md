# Portal Header migration

This guide maps the legacy production header behavior to the package-owned
`PortalHeader`. Keep the legacy header active until each consumer completes its
own reviewed rollout.

| Legacy concern | Portal Header configuration |
| --- | --- |
| Entertainment or News header mode | One production-compatible component; set `brand.sectionLabel`, `socialPreset`, and `theme.accentColor` independently |
| Main navigation markup | Default `gma` preset; `primaryNavigation` stable-ID patches |
| Network/service links | Default `gma` preset; `networkNavigation` stable-ID patches |
| Fully consumer-owned menu | `navigationPreset="none"` plus complete consumer arrays |
| Active CSS class | `current: true`, rendered as `aria-current="page"` |
| Disabled/non-live item | `disabled: true`, rendered without a navigable anchor |
| Social ribbon URLs | `socialPreset="entertainment"` or `socialPreset="news"` |
| Consumer social changes | `socialLinks` stable-ID override/hide/append patches |
| Search globals and hard-coded route | `search={{ action, queryParam }}` native GET configuration |
| Full-page anchor navigation | Default anchors |
| Next.js client navigation | Consumer `renderLink` adapter in a Client Component |
| Legacy logo URL | Package-local verified GMA logo; optional `brand.logoSrc` override |
| Fixed dark top bar and mode border | Compact sticky dark bar with configurable `--gno-portal-header-accent` |
| Legacy expanded link overlay | Accessible full-width dropdown; one primary plus three top-to-bottom network columns and two mobile columns |
| Mobile search/social section | Rendered inside the expanded mobile dropdown |

The following legacy behaviors are intentionally unsupported: jQuery, shared
browser globals, inline handlers, `social_ribbon_click`, Google Analytics,
generic analytics callbacks, account/authentication/SSO controls, cookie consent
coordination, remote icon/font/logo loading, legacy CSS class compatibility, and
consumer-specific production routes.

The visual structure intentionally follows the live GMA News reference without
copying its legacy selectors or runtime. Desktop social/search/grid actions,
mobile grid-only actions, compact measured heights, and the responsive dropdown
are package-owned scoped CSS.

Migration is backward compatible at the package level because Portal Header is a
new named export. Consumers inherit all 16 verified production navigation links
unless they select `navigationPreset="none"`; consumer changes use stable IDs.
Consumers must import the package stylesheet, supply their own search route, and
test their router adapter if used. Roll back a consumer by removing its
`PortalHeader` integration and restoring its previous header while leaving the
package installed.
