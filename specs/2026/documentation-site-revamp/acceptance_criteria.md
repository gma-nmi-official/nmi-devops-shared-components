# Acceptance criteria: documentation site revamp

| ID | Requirement | Criterion | Validation method | Status |
| --- | --- | --- | --- | --- |
| AC-001 | R-001 | `/` renders a single clear H1, package purpose, primary component/catalog action, Storybook action, and package/version context. | Playwright + manual visual review | PASS |
| AC-002 | R-001 | The approved visual system is consistently applied to site header, hero, cards, guide navigation, code blocks, and footer at desktop and mobile widths. | Manual review at 375px and 1440px | PASS — APR-005 |
| AC-003 | R-002 | Home and `/catalog` each expose named links to all four public entries. | Playwright role/link assertions | PASS |
| AC-004 | R-003 | Each approved slug builds as a static route, loads directly, has one H1, and returns a usable guide; an unsupported slug is not generated. | `GITHUB_PAGES=true npm run build` + route inspection | PASS |
| AC-005 | R-004 | Every guide visibly contains Overview, Install, Setup, Configuration, and Operational considerations; accessibility/security sections may say N/A only with component-specific rationale. | Content assertions + manual review | PASS |
| AC-006 | R-004 | Every install/setup snippet uses the current package name and public API and matches the package/component source of truth. | Type/content review + consumer fixture awareness | PASS |
| AC-007 | R-005 | `/catalog` remains a navigable index and `/docs` continues to load the Storybook frame, including query forwarding and configured base path. | Playwright regression + build | PASS |
| AC-008 | R-006 | The production static build succeeds and emits `/`, `/catalog`, `/docs`, and all four guide routes without request-time APIs. | `GITHUB_PAGES=true npm run build` | PASS |
| AC-009 | R-007 | `app/favicon.ico` matches the APR-004 downloaded source asset, Next emits `/favicon.ico`, and browser metadata references the local icon only. | Hash/size record + build output + browser head assertion | PASS |
| AC-010 | R-008 | Keyboard users can reach and activate primary navigation, component cards, in-guide navigation, and Storybook links with a visible focus indicator. | Playwright keyboard flow + manual check | PASS |
| AC-011 | R-008 | At 320, 375, 768, 1024, and 1440 CSS pixels, pages have no page-level horizontal overflow and content remains readable at 200% zoom. | Playwright viewport checks + manual zoom check | PASS |
| AC-012 | R-009 | `/`, `/catalog`, and each guide expose a unique descriptive document title and description. | Playwright title/head assertions | PASS |
| AC-013 | R-010 | Preview routes make no request to Google ad or analytics providers; existing interactive preview behaviors remain covered on their new guide route. | Playwright network interception/regression | PASS |
| AC-014 | R-011 | `npm run check` and `npm run test:e2e` pass, and README/consumer-facing route references match the implemented navigation. | Automated gates + documentation review | PASS |
| AC-015 | R-012 | No file under package runtime source is behaviorally changed and root/package/lockfile versions and package exports remain unchanged. | Git diff + package dry-run only if diff warrants | PASS |
| AC-016 | R-013 | Every route using the shared documentation shell renders the exact local official NMI SVG, retains an accessible home-link name, honors the configured base path, and makes no runtime request to `www.gmanmi.com`. | Hash/size record + Playwright source/accessibility assertion + static export inspection | PASS |
