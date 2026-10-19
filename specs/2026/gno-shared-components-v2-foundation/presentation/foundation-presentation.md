# NMI DevOps Shared Components Foundation

> Updated 2026-10-19: Current distribution uses GitHub Releases. Release approval, private asset authentication, and workflow details are in [`docs/versioning.md`](../../../docs/versioning.md) and [`docs/consumer-setup.md`](../../../docs/consumer-setup.md).

## Team-lead presentation

**Date:** 2026-10-08  
**Repository:** `repository checkout root`  
**Remote:** `https://github.com/gma-nmi-official/2026-GNO-Website-Revamp---Shared-Components.git`

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
gh release download v0.1.0 --repo gma-nmi-official/2026-GNO-Website-Revamp---Shared-Components --pattern 'nmi-devops-shared-components-0.1.0.tgz'
npm install ./nmi-devops-shared-components-0.1.0.tgz
```

```tsx
import { PortalHeader, PortalFooter } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

const navigation = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Entertainment", href: "/entertainment" },
];

export default function SiteHeader() {
  return (
    <>
      <PortalHeader
        brand={{ label: "GMA Network", href: "/" }}
        navigation={navigation}
        activePath="/"
      />
      <main>{/* consumer page content */}</main>
      <PortalFooter links={[{ label: "Contact", href: "/contact" }]} />
    </>
  );
}
```

The GitHub Release URL is the release source; the installed package and import name remain `nmi-devops-shared-components`. Since the repository is private, consumers need repository access and authenticated asset downloads. The package is intended to support both JavaScript and TypeScript consumers.

The `PortalHeader` and `PortalFooter` examples are illustrative until their requirements and public prop contracts are approved. Consumers compose approved components and provide application data; each component owns its layout, responsive behavior, accessibility, and component-scoped styles.

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

The catalog is currently intentionally empty because generic demonstration components were removed. The first approved GNO component will establish the initial public contract.

## 6. PortalHeader direction

The first planned component is `portal_header`.

Approved scope:

- reproduce the current GNO revamp header design and behavior
- revamp-only; no legacy variant
- default navigation from the production reference
- consumer-overridable navigation
- no account or SSO integration
- no GA or analytics integration
- no cookie agreement or consent banner
- bundled, component-scoped Inter 600 font asset
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

- `PortalHeader` implementation
- account/SSO logic
- GA/analytics
- cookie consent
- backend APIs
- application authentication
- consumer-specific routing
- registry publication
- deployment

## 9. Current review status

Argus independently reviewed the foundation and identified two commit-blocking findings:

1. The package is unscoped but configured with restricted npm access.
2. The private workspace root and publishable package use the same package name.

Additional cleanup findings are restoring standard `.gitignore` exclusions and replacing the placeholder README import example.

Review report: `execution/07_code_review_report.md`.

## 10. Current review and naming status

The previous Argus findings were closed for the earlier package identity. The product is now **NMI DevOps Shared Components**, with consumer package ID `nmi-devops-shared-components` and private workspace root `nmi-devops-shared-components-workspace`. This new package-identity change requires fresh validation and independent review before commit approval. The former package ID is retained in the changelog as the migration source.

The package artifact is attached to a GitHub Release by the tag-triggered workflow; public npm registry publication is not authorized. Confirm artifact download permissions with the repository owner before consumer release.

## 11. Component versioning

The initial recommendation is one version for the whole package, not independent versions per component.

| Change | Version impact | Example |
| --- | --- | --- |
| New component or backward-compatible feature | Minor | `0.1.0` → `0.2.0` |
| Bug fix, accessibility fix, or non-breaking style correction | Patch | `0.2.0` → `0.2.1` |
| Removed export, renamed prop, incompatible behavior, or breaking token change | Major | `0.2.1` → `1.0.0` |
| Consumer package ID rename | Major migration | Consumers update install, package, and stylesheet imports |
| PortalHeader pre-release testing | Pre-release tag | `0.3.0-rc.1` |

Every release should include a changelog entry, package dry-run, validation evidence, and a documented migration note for breaking changes. A component-specific version should only be introduced later if the package becomes large enough to require independent release cadence or dependencies.

Release artifact flow:

```text
annotated Git tag v0.1.0 → GitHub Actions → validate and package
                         → nmi-devops-shared-components-0.1.0.tgz
                         → GitHub Release asset
```

Consumers install the versioned `.tgz`; Git tags preserve package release history.

## 12. Next steps

1. Complete package-rename verification and QA.
2. Obtain independent review.
3. Obtain fresh commit approval and separate push approval.
4. Confirm private GitHub Release asset access before consumer release.
4. Obtain Argus confirmation on the corrected revision.
5. Obtain commit approval and commit the foundation.
6. Request separate push approval for `origin/master`.
7. Begin `portal_header` implementation from its approved requirements.
