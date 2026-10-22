# Asset inventory: Portal Header

## Approved assets

| Asset | Source | Intended package form | Verification | Rights/conditions | Status |
| --- | --- | --- | --- | --- | --- |
| GMA header logo | `https://aphrodite.gmanetwork.com/gma-header-logo.svg` | Repository-local source at `packages/ui/src/assets/gma-header-logo.svg`, embedded component default, and package export `nmi-devops-shared-components/assets/gma-header-logo.svg`; no runtime hotlink | Source SVG and embedded default reverified 2026-10-22 with matching SHA-256 `4265686660c12d10f6954d8dec60884933d680f10dd79a4ff7a76c016d62f39a`; the package dry-run includes `dist/assets/gma-header-logo.svg`; static scan found no script, event handler, external HTTP reference, or `foreignObject` | User selected the GMA-owned logo for this private package in PH-A07. Preserve the artwork and trademark; do not imply third-party endorsement. Recheck the repository copy before commit. | Implemented, hash-matched, exported, and packaged |
| UI and social icons | [Font Awesome Free SVG packages](https://docs.fontawesome.com/web/setup/packages) plus repository-authored menu-grid SVG | Individual package imports for search/close plus Facebook, Twitter/X, Instagram, YouTube, Viber, and RSS; local nine-solid-rectangle SVG for the menu grid | Font Awesome versions are locked; menu-grid SVG is component source with no runtime font | Font Awesome Free icons are CC BY 4.0; supporting code is MIT. Retain package licensing/attribution. Brand icons may only represent their corresponding company, product, or service. No Pro icons or hosted Kit credentials. | Font Awesome approved by PH-A07/PH-A08; menu-grid correction approved by PH-A16-PH-A18 |

## Packaging rules

- Do not load the logo, Font Awesome Kit JavaScript, CDN CSS, webfonts, or icons from a remote runtime URL.
- Import only individual Font Awesome icons required by approved states; do not import an entire style or library.
- Preserve accessible names on the link/control. Decorative SVGs remain hidden from assistive technology.
- Include applicable third-party notices in the packed artifact and document the dependency in package guidance and `CHANGELOG.md`.
- Re-run source/output inspection to prove that the packed component has no prohibited remote runtime dependency.

## Approved fallback decisions

- Entertainment/News presets provide approved default ordering and destinations. Consumers may override, hide, or append entries and must provide accessible labels for new IDs.
- No branded text font is bundled. PH-A10 approves inheriting the consumer/system font stack.
- PH-A10 approves visible `GMA Network` text when the logo is unavailable and a generic link icon for unknown social types.
- Portal Header color variables default to the existing package `--gno-*` tokens and remain consumer-overridable.

## References

- [Font Awesome package guidance](https://docs.fontawesome.com/web/setup/packages)
- [Font Awesome React individual-icon guidance](https://docs.fontawesome.com/web/use-with/react/add-icons/)
- [Font Awesome Free license](https://fontawesome.com/license/free)
- [Font Awesome 7 license file](https://github.com/FortAwesome/Font-Awesome/blob/7.x/LICENSE.txt)
