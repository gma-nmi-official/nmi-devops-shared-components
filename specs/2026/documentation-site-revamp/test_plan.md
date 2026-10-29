# Test plan: documentation site revamp

- Approved requirements/design: pending approval of this specification set.
- Repository revision / unit: baseline
  `e8b09639b2ddf46b084f74ed4ff700c00c4ca3ca`; future test evidence must name the
  implemented revision and dirty diff.
- Environment and safe test data: local static documentation only; component
  previews use existing local fakes and placeholder identifiers, never
  production inventory or analytics delivery.
- Required tools and commands: Node.js 22.23.4, npm 10.9.9,
  `npm run check`, `GITHUB_PAGES=true npm run build`, and `npm run test:e2e`.
- Initial setup record and readiness blockers: [initial_setup.md](initial_setup.md).
- Standalone manual testing destination: `manual_testing.md`, to be created by
  Vera during verification; QA recipient is the repository owner and status will
  initially be Prepared / not executed.

| Requirement / risk | Test level | Scenario including failure cases | Expected result | Required / N/A reason | Evidence destination |
| --- | --- | --- | --- | --- | --- |
| R-001, R-002 | Acceptance | Load `/` and `/catalog`; verify hierarchy, CTAs, and four named entries. | Content and links are visible and coherent. | Required | Playwright + manual testing |
| R-003, R-006 | Build / integration | Build static export and inspect the route list for four known slugs; request an unknown slug in the production fixture. | Known routes are static; unknown route is not generated/returns 404. | Required | Build log + Playwright |
| R-004 | Acceptance | Inspect every guide for required sections, accurate imports, setup, configuration, responsibility boundaries, and related links. | Complete, entry-specific guide content with no stale API. | Required | Content assertions + manual testing |
| R-005 | Regression | Navigate `/catalog` and `/docs`, including a Storybook query path and configured base path. | Catalog remains useful; Storybook frame and query forwarding work. | Required | Playwright |
| R-007 | Build / acceptance | Compare local favicon to recorded downloaded asset; inspect emitted HTML/head and network requests. | Local exact asset is emitted and no remote favicon request occurs. | Required | Hash record + Playwright |
| R-008 | Accessibility / regression | Keyboard navigation, visible focus, landmarks/headings, 200% zoom, and responsive widths 320–1440px. | All routes remain operable and have no page-level overflow. | Required | Playwright + axe/manual testing |
| R-009 | Acceptance | Inspect title and meta description for home, index, and each guide. | Values are present, unique, and describe the current route. | Required | Playwright |
| R-010 | Security / regression | Exercise guide previews while intercepting provider domains and existing component interactions. | No ad/analytics provider request; previews retain tested behavior. | Required | Playwright network assertions |
| R-011 | Regression | Run repository quality gate and end-to-end suite; inspect README route references. | Commands pass and documentation matches routes. | Required | Verification report |
| R-012 | Scope | Review changed files, package versions, exports, and package-source diff. | No published API/version/runtime component change. | Required | Git diff + independent review |
| R-013 | Build / accessibility | Compare the local SVG to the recorded source; inspect its header rendering, accessible home-link name, base-path output, and network requests. | Exact official logo renders locally on every shell route without a `www.gmanmi.com` request. | Required | Hash record + Playwright + static export |

## Exit criteria

- All required acceptance criteria pass on the complete candidate.
- `npm run check`, `GITHUB_PAGES=true npm run build`, and `npm run test:e2e`
  exit 0. Any rerun needed because of sandbox process restrictions is recorded.
- Manual testing is executed or explicitly remains BLOCKED; unrun required cases
  are never reported as passing.
- Independent review completes with no unresolved required finding.

## Known limitations, unavailable tools, and next actions

- APR-004 asset headers and exact source hashes were captured during approved
  implementation; output hashes must be confirmed again after the static build.
- The baseline end-to-end suite was inspected but not rerun for inception; it is
  required after implementation.
- Visual professionalism requires owner signoff in manual QA in addition to
  objective responsive/accessibility assertions.
