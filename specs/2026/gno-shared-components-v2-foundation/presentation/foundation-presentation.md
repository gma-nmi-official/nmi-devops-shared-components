# NMI DevOps Shared Components Foundation

> Updated 2026-10-23: Current distribution uses private GitHub Release assets. Release approval, authenticated consumer downloads, and workflow details are in [`docs/versioning.md`](../../../docs/versioning.md) and [`docs/consumer-setup.md`](../../../docs/consumer-setup.md).

## Team-lead presentation

**Date:** 2026-10-08  
**Repository:** `repository checkout root`  
**Remote:** `https://github.com/gma-nmi-official/nmi-devops-shared-components.git`

## 1. Purpose

Create a reusable, configurable component package for GNO portal products. The package must be consumable by separate JavaScript and TypeScript applications and support composed portal components such as `PortalHeader`.

## 2. Foundation delivered

- npm workspace with a publishable `packages/ui` workspace
- JavaScript runtime output and TypeScript declarations
- Shared CSS/token foundation
- Next.js consumer showcase
- Consumer-facing component catalog at `/catalog`
- Storybook component workshop
- Vitest and accessibility testing setup
- GitHub Actions quality workflow
- GNO-specific package and consumer documentation
- GitHub `origin` configured for the target repository

## 3. Repository shape

```text
gno-shared-components-v2/
├─ packages/ui/          # Publishable component package
├─ app/                  # Next.js showcase and catalog
├─ .storybook/           # Component documentation
├─ .github/workflows/    # CI quality checks
└─ package-lock.json
```

## 3A. Technical architecture

```text
Consumer Next.js / JavaScript application
        │ npm install + named imports
        ▼
nmi-devops-shared-components (published workspace package)
        ├─ dist/index.js          ESM runtime
        ├─ dist/index.d.ts        Type declarations
        └─ dist/styles.css        Explicit CSS contract
        │ React peer dependency
        ▼
Component modules
        ├─ framework-neutral React UI
        ├─ component-scoped tokens and styles
        └─ optional framework adapters only when approved
```

Technical boundaries:

- `packages/ui` is the only publishable artifact; the root is an orchestration/showcase workspace.
- React and React DOM are peer dependencies so consumers own the runtime version.
- Components are server-compatible by default; interactive modules receive narrow client boundaries.
- CSS is explicitly imported from `nmi-devops-shared-components/styles.css`; consumer Tailwind scanning is not required.
- Public exports are controlled through `packages/ui/package.json#exports`; internal source paths are not API.
- Storybook exercises components in isolation; the Next.js showcase validates real consumer integration.
- Every approved component owns a colocated Storybook story covering its API, states, controls, responsive behavior, and interactions.
- Storybook stories are part of the component delivery unit and are updated with implementation changes.
- CI runs install, typecheck, lint, tests, package build, Storybook build, Next.js build, and package inspection.

Build flow:

```text
npm ci → typecheck/lint/test → TypeScript package build → CSS copy
      → Storybook build → Next.js production build → npm pack --dry-run
```

## 4. Consumer model

Consumers install the package once and import approved named exports:

```bash
gh release download v1.1.0 --repo gma-nmi-official/nmi-devops-shared-components --pattern 'nmi-devops-shared-components-1.1.0.tgz'
npm install ./nmi-devops-shared-components-1.1.0.tgz
```

```tsx
import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export default function SiteHeader() {
  return (
    <PortalHeader
      brand={{ href: "/", sectionLabel: "News" }}
      primaryNavigation={[{ id: "news", current: true }]}
      socialPreset="news"
      search={{ action: "/search", queryParam: "q" }}
    />
  );
}
```

The private GitHub Release URL is the release source; consumers need repository access and a `GH_TOKEN` authorized to download assets. Keep the token in a CI secret store. The installed package and import name remain `nmi-devops-shared-components`. The package supports both JavaScript and TypeScript consumers.

`PortalHeader` is the first released public component. Its current API, rendered preview, configuration guidance, and supported states are documented in `/catalog` and the linked Storybook stories. Consumers provide application data while the component owns its layout, responsive behavior, accessibility, and component-scoped styles.

Implementation model:

- Next.js consumers render `<PortalHeader />` directly in a page or layout.
- Other React JavaScript consumers render it through their existing React root.
- The foundation does not expose a raw `<portal-header>` custom element; a web-component adapter would require a separate approved delivery unit.

Consumer setup presented to application teams:

1. Install the approved package version.
2. Import a public named component export.
3. Import `nmi-devops-shared-components/styles.css` once at the application style boundary.
4. Follow the component catalog for props, states, accessibility, and responsive behavior.
5. Use the linked Storybook story as the isolated engineering reference.

The consumer owns routes, data fetching, authentication, analytics, and other application integrations. The shared package owns the component contract, rendering behavior, component-scoped styles, tests, and Storybook story.

## 5. Component catalog

The Next.js showcase includes `/catalog`. It is the consumer-facing inventory and onboarding page, not the package runtime itself.

The catalog page is expected to provide:

- component index with names, purpose, and release status
- rendered preview of each approved component
- supported states and responsive behavior
- configuration and public props/events
- JavaScript and TypeScript import examples
- stylesheet import and installation command
- link to the component's dedicated Storybook story
- accessibility and integration notes

Every public component will receive:

- rendered preview
- purpose and supported states
- configuration details
- JavaScript import example
- TypeScript import example
- stylesheet import
- installation instructions
- dedicated Storybook story with supported controls and states
- interaction and accessibility coverage when behavior requires it

The catalog now includes `PortalHeader` as the first released GNO component, with a live preview, configuration guidance, public API examples, supported states, and Storybook links.

## 6. PortalHeader release

The first released component is `PortalHeader`.

Approved scope:

- reproduce the current GNO revamp header design and behavior
- revamp-only; no legacy variant
- default navigation from the production reference
- consumer-overridable navigation
- no account or SSO integration
- no GA or analytics integration
- no cookie agreement or consent banner
- React implementation replacing legacy global DOM mutation

The supplied production JavaScript and CSS were reviewed and converted into requirements and user stories.

## 7. Quality foundation

The foundation supports:

- TypeScript checking
- ESLint
- Vitest
- axe accessibility checks
- Storybook builds
- per-component Storybook stories and controls
- Next.js production builds
- package dry-run inspection
- browser smoke tests
- npm audit
- GitHub Actions CI

Previous foundation validation passed typecheck, lint, tests, package build, Storybook build, Next.js build, package dry-run, and npm audit.

## 8. Deliberate exclusions

- account/SSO logic
- GA/analytics
- cookie consent
- backend APIs
- application authentication
- consumer-specific routing
- registry publication
- deployment

## 9. Current review status

`PortalHeader` and its public documentation are merged to `master`. The `v1.1.0` release candidate has passed quality, browser, packaging, shipped-dependency audit, and whitespace checks. A-026 corrected stale presentation content, and A-028 aligns active guidance with the private repository contract.

Review reports: `execution/20_v1_1_0_independent_review_2026-10-23.md` and `execution/21_v1_1_0_review_adjustment_plan_2026-10-23.md`.

## 10. Current release and naming status

The product is **NMI DevOps Shared Components**, with consumer package ID `nmi-devops-shared-components` and private workspace root `nmi-devops-shared-components-workspace`. The current release candidate is `v1.1.0`, which adds the released `PortalHeader` public component. The former package ID is retained in the changelog as the migration source.

The package artifact is attached to a GitHub Release by the tag-triggered workflow; public npm registry publication is not authorized. Confirm authenticated artifact download access with the repository owner before consumer release.

## 11. Component versioning

The initial recommendation is one version for the whole package, not independent versions per component.

| Change | Version impact | Example |
| --- | --- | --- |
| New component or backward-compatible feature | Minor | `0.1.0` → `0.2.0` |
| Bug fix, accessibility fix, or non-breaking style correction | Patch | `0.2.0` → `0.2.1` |
| Removed export, renamed prop, incompatible behavior, or breaking token change | Major | `0.2.1` → `1.0.0` |
| Consumer package ID rename | Major migration | Consumers update install, package, and stylesheet imports |
| Backward-compatible PortalHeader enhancement | Minor | `1.1.0` → `1.2.0` |

Every release should include a changelog entry, package dry-run, validation evidence, and a documented migration note for breaking changes. A component-specific version should only be introduced later if the package becomes large enough to require independent release cadence or dependencies.

Release artifact flow:

```text
annotated Git tag v1.1.0 → GitHub Actions → validate and package
                         → nmi-devops-shared-components-1.1.0.tgz
                         → GitHub Release asset
```

Consumers install the versioned `.tgz`; Git tags preserve package release history.

## 12. Next steps

1. Close the required `v1.1.0` release-review findings.
2. Rerun release validation and obtain Argus confirmation on the corrected revision.
3. Obtain commit approval for the reviewed release candidate.
4. Obtain separate push and pull-request approvals; the repository owner performs the final merge.
5. Confirm GitHub Release asset access before consumer release.
6. Obtain separate approval for the exact `v1.1.0` tag push that triggers release publication.
