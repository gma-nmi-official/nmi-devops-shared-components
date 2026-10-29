# Testing and verification report: documentation site revamp

## Executive summary

Automated verification passed: the full repository quality gate, 73 unit tests,
consumer fixtures, Storybook, the Next.js production build, the GitHub Pages
static export, and all 46 Playwright desktop/mobile cases completed successfully.
Three technical visual cases and repository-owner aesthetic acceptance passed.
Verification is complete for the unchanged candidate and ready for independent
review.

## Tested context

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch: `feature/documentation-site-revamp`.
- Base: `54e9a06d9ee86874b5c4cf40f7e0d3ce1a67e6ed`.
- Candidate: base plus the current documentation-site dirty diff; no commit yet.
- Environment: Windows, Node.js 22.23.4, npm 10.9.9, Next.js 16.4.2,
  Playwright Chromium desktop/mobile projects.
- Safe data: repository-local fake ad and GTM transports; no production provider
  or persistent data.
- Manual reference: [manual_testing.md](../manual_testing.md); recipient is the
  repository owner; handoff executed and MT-004 passed through APR-005.
- Release completeness: N/A. This delivery does not change the published package,
  version, lockfile, runtime exports, component stories, changelog, or migration.

## Commands and exit results

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run typecheck` | PASS, exit 0 | Package build and root/package TypeScript checks passed. |
| `npm run lint` | PASS, exit 0 | ESLint completed without findings. |
| `npm run test:e2e` | PASS, exit 0 | 46/46 desktop/mobile Chromium cases passed in 1.1 minutes after APR-004. |
| `npx playwright test tests/e2e/showcase.spec.ts --grep "local NMI branding"` | PASS, exit 0 | Strengthened post-suite check passed in both desktop and mobile projects across all six shared-shell routes. |
| `npm run check` | PASS, exit 0 | Size gates, lint, 9 test files / 73 tests, 6 consumer fixtures, Storybook, and Next build passed. |
| `$env:GITHUB_PAGES = 'true'; npm run build` | PASS, exit 0 | Static export emitted home, catalog, docs, and all four guide routes. |
| `$env:GITHUB_PAGES = 'true'; $env:NEXT_PUBLIC_BASE_PATH = '/gno-shared-components-v2'; npx next build` | PASS, exit 0 | All routes exported; logo preload/source and favicon URLs contain the configured base path. |
| APR-004 asset source/output hash comparison | PASS | Logo source/public/output SHA-256 `B0014A90C9881B57811143A76BE85B94D8804F391914DEC2D45BDCFC26AB789F`; favicon source/app/output SHA-256 `8CAA03F3E38F0FFC8C9C7B506B1A5773117D99418BC1A5098A45739B60F054FA`. |

## Requirement evidence

| Requirement | Test level / scenario | Expected | Actual | Status | Evidence |
| --- | --- | --- | --- | --- | --- |
| R-001 | Acceptance / professional home | Clear hierarchy and coherent approved visual system | Technical visual inspection and owner acceptance passed | PASS | MT-001 PASS, MT-004 PASS, APR-005 |
| R-002 | Browser / inventory | Home and catalog link all four entries | All four named links present on both surfaces | PASS | Playwright navigation/inventory test |
| R-003 | Build / routes | Four dedicated known routes; unknown slug 404 | Four SSG routes emitted; unknown request returned 404 | PASS | Static build + Playwright negative case |
| R-004 | Content / acceptance | Required guide sections and accurate setup | All guides render structured content from typed registry | PASS | Typecheck, browser assertions, MT-002 |
| R-005 | Regression | `/catalog` index and `/docs` Storybook remain usable | Index and Storybook route build; navigation preserved | PASS | Build evidence; browser query-forwarding evidence added in APR-006 validation |
| R-006 | Build | Static export and trailing-slash model succeed | GitHub Pages export completed with all routes | PASS | Export log and `out/` inspection |
| R-007 | Asset / reliability | Exact APR-004 local favicon, no runtime remote dependency | Local/output hashes match the 1,150-byte downloaded source | PASS | Hash evidence + favicon browser assertion |
| R-008 | Accessibility / responsive | Keyboard, focus, 320px+, 200% zoom, no overflow | Automated keyboard/viewport cases and manual zoom passed | PASS | Playwright + MT-002/MT-003 |
| R-009 | Metadata | Unique title and description per route | Home, index, and four guides passed assertions | PASS | Playwright metadata test |
| R-010 | Security / regression | No live provider calls; previews retain behavior | No Google provider request; interactions passed | PASS | Playwright network/interaction cases |
| R-011 | Regression / docs | Quality gates pass and route docs align | All gates pass; README and consumer setup updated | PASS | `npm run check`, e2e, diff review |
| R-012 | Scope | No package/runtime/release metadata change | Package source/version/export/lockfile unchanged | PASS | Git diff inspection |
| R-013 | Asset / accessibility | Exact local official logo, accessible home link, base-path support, no remote request | Exact hashes match; desktop/mobile visuals pass; exported URLs use the configured base path; no source-host URL occurs in HTML | PASS | Hash/export inspection, Playwright branding assertion, MT-001 |

## Failed or blocked requirements and N/A reasons

- R-001 / AC-002 passed when the repository owner approved progression through
  APR-005. No executed test failed.
- Package dry-run, changelog, migration, and release version verification are
  N/A because the approved scope does not change the published package.
- Existing successful Storybook warnings are non-fatal baseline tool warnings;
  no new warning class was introduced by this delivery.

## Recommendation and next action

Hand the same unchanged dirty diff to an independent Argus or human reviewer.
The implementing session cannot claim its own review as independent.
