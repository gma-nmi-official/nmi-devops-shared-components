# Test plan: Public Storybook documentation

- Approved requirements/design: pending approval of this project package.
- Repository revision / unit: baseline `0b2561575b68f1e89ea9cf16fdaaa7e039670296`; SB-01 through SB-05 planned.
- Environment and safe test data: local static Storybook with repository-owned examples only; no production credentials or private service calls.
- Required tools and commands: `npm ci`, `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build-storybook`, public-output audit, static-server browser smoke checks, and the full `npm run check` regression gate.
- Initial setup record and readiness blockers: `initial_setup.md`; public Pages capability remains an operational prerequisite.
- Standalone `manual_testing.md` destination: this project directory during verification. QA recipients are a component consumer unfamiliar with the implementation plus an authorized repository owner for public visibility checks.

| Requirement / risk | Test level | Scenario including failure cases | Expected result | Required / N/A reason | Evidence destination |
| --- | --- | --- | --- | --- | --- |
| R-002-R-006, NFR-007 | Acceptance/manual | First-time visitor follows landing page to a component and completes the basic integration journey. | Journey is understandable without repository context. | Required | `manual_testing.md` |
| R-005 | Story interaction/regression | Exercise controls, responsive viewports, menu interaction, optional content, long content, overrides, and fallbacks. | Stories render and interactions behave as documented. | Required | Verification report and Storybook test evidence |
| R-007, NFR-003 | Accessibility | Navigate manager/docs/component examples by keyboard and run automated accessibility checks. | Focus is visible and no serious/critical violations remain. | Required | Verification report and `manual_testing.md` |
| R-008, NFR-001 | Security/content | Scan generated files for credential patterns, absolute paths, internal records, private URLs, and unexpected external requests; inspect positives manually. | No prohibited public content; intended false positives are documented. | Required | Verification and independent review reports |
| R-004, R-014, NFR-009 | Documentation completeness | Compare package exports and changelog version headings with Storybook's generated index. | Every public component and release is represented; missing coverage fails. | Required | Verification report |
| R-009, R-011, NFR-004 | Application server/browser | Through both local development and production application servers, load `/docs`, docs/story deep links, Releases, metadata, assets, `/catalog`, and `/` in supported browser engines. | `/docs` remains the interactive docs route, `/catalog` remains package documentation, `/` is a clear landing page, assets use the same origin, and navigation has no unexpected 404s. | Required | Verification report and `manual_testing.md` |
| R-010, NFR-005 | Build integration | Confirm build order and force a Storybook failure. | Root build stops and does not report a valid deployable result. | Required | Verification report |
| R-012 | Access-path regression | Inspect scripts/docs and probe the application route after `npm run dev`. | Application `/docs` works; no supported command or guidance directs users to port 6006 or treats Storybook as a separate user-facing site. | Required | Verification report |
| R-015, R-016 | Package docs and landing | Review package installation/API/release guidance at `/catalog`, interactive links to `/docs`, and concise orientation links at `/`. | Both pages have distinct purposes and no broken links or duplicated full Storybook state content. | Required | Verification report and `manual_testing.md` |
| Regression | Full build | Run repository `npm run check`, package dry run, and consumer fixture checks. | Existing component/package/showcase checks remain passing. | Required | Verification report |
| Deployed acceptance | External acceptance | After an authorized deployment, visit the application documentation route and inspect browser network requests. | Storybook is reachable on the application origin and makes no unexpected private/external runtime calls. | Required only when deployment is in scope | Deployment verification report |

## Exit criteria

All required automated and manual cases pass on the reviewed revision. The Storybook-content audit, combined-build/route verification, and independent review must pass before commit readiness. When deployment is in scope, the same-origin deployed route and access behavior must also pass before calling the documentation live.

## Known limitations, unavailable tools, and next actions

The current Storybook build emits an existing Vite warning that the component-level `"use client"` directive is ignored during bundling and bundle-size warnings for Storybook dependencies; the build completes. These warnings are evaluated during implementation but do not currently demonstrate a functional failure.

Native Safari and GitHub organization Pages settings may require human verification. Unrun checks remain BLOCKED rather than PASS.
