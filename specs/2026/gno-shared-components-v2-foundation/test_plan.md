# Test plan: gno-shared-components-v2 foundation

## Package identity rename (R-014 / AC-019)

- Verify root and publishable `package.json` names, workspace dependency, and `package-lock.json` entries all use their approved new identities.
- Search active source, current documentation, and release scripts for stale package-ID references; allow old ID only in historical verification and explicit migration notes.
- Run package typecheck/build and dry-run packing; verify the tarball uses the new package ID and file name.
- Run showcase tests, typecheck, lint, Storybook build, and Next.js build; check browser-visible product titles.
- Complete linked manual QA cases in `manual_testing.md`; leave results pending until actually run.

- Approved requirements/design: foundation requirements/design; R-014/AC-019 package-name amendment approved 2026-10-13
- Repository revision: `ef5546d0dcf953d0fed2e4b844d425d3814f6e98`; units U-001 through U-006
- Environment and safe test data: local Node/npm environment; no production data, services, or credentials
- Required tools: npm scripts selected during implementation; Next.js production build; package pack dry run; Storybook/Vitest/browser tooling approved by this plan

| Requirement / risk | Test level | Scenario including failure cases | Expected result | Required / N/A reason | Evidence destination |
| --- | --- | --- | --- | --- | --- |
| R-001, R-009 package contract | Build | Build library and inspect exports, declarations, CSS, peer dependencies, and packed file list | Only documented consumable artifacts are present | Required | Per-unit compact report |
| R-002 consumer integration | Integration | Install/link workspace package into showcase and perform production build | Import by package name resolves and renders | Required | U-002/U-006 reports |
| R-003 configuration | Unit/acceptance | Exercise the first approved GNO component's variants, composition, consumer overrides, and token theme | Types and rendered behavior match contract | Required when U-005 is selected | U-005 report |
| R-004 server/client boundary | Build/regression | Import noninteractive surface from a Server Component and inspect built directives | Build passes; no accidental package-wide client boundary | Required | U-002/U-006 reports |
| R-005 Tailwind isolation | Integration | Remove any consumer package-source scanning and render with only CSS export imported | Styled output remains correct | Required | U-003/U-006 reports |
| R-006 stories | Build/acceptance | Build static Storybook and enumerate required reference states | Static build passes and states exist | Required | U-004/U-005 reports |
| R-007 code quality | Static/unit | Run formatting check if configured, type check, lint, and component tests | All required commands exit successfully | Required | Every affected unit report |
| Accessibility | Accessibility/manual | Run axe checks and inspect keyboard, focus, naming, responsive, and state behavior for each approved component | No serious/critical violations; documented behavior works | Required per component | U-005/U-006 reports |
| Regression | Build/integration | Run all checks from a clean dependency install on final candidate | Reproducible PASS at recorded revision | Required | U-006 report |
| Security | Review | Inspect dependencies, scripts, network/secret behavior, and unsafe DOM use | No unapproved behavior or critical known issue accepted | Required | Review report |
| Performance | Measurement | Record packed size and client-boundary/bundle baseline | Baseline recorded; no invented pass threshold | Required measurement | U-006 report |

## Exit criteria

All required checks pass at the recorded revision. N/A items require a reason. FAIL or BLOCKED prevents review readiness. Independent Argus review follows successful Vera validation; the implementer cannot supply that independent review.

## Known limitations, unavailable tools, and next actions

Exact commands depend on the approved toolchain chosen during U-002/U-004. A broader Next.js compatibility matrix, visual-regression service, registry publication test, and deployed documentation test are deferred until their targets and owners are approved.
