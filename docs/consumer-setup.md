# Consumer setup

This guide explains how a JavaScript or TypeScript application consumes the published GNO component package.

## 1. Install the package

Download the approved `.tgz` asset from the GitHub Release, then install it in the consumer application. Set `GH_TOKEN` in the environment to a GitHub token authorized to read this private repository:

```bash
gh release download v1.0.0 \
  --repo gma-nmi-official/2026-GNO-Website-Revamp---Shared-Components \
  --pattern 'nmi-devops-shared-components-1.0.0.tgz'
npm install ./nmi-devops-shared-components-1.0.0.tgz
```

The example uses the initial stable release, `v1.0.0`. Keep the token in the consumer's CI secret store; do not commit it. The installed package and import name remain `nmi-devops-shared-components`.

## 2. Import the component and styles

Import components through the package's public named exports. Do not import internal files from `packages/ui/src`.

```tsx
// Replace ApprovedGnoComponent with an approved exported component.
import { ApprovedGnoComponent } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";
```

The stylesheet import is required for the package tokens and component-scoped styles.

## 3. Use it in a Next.js application

Server-compatible components can be rendered from a Server Component. If a component exposes interactive behavior, follow its catalog and Storybook guidance for the required client boundary.

```tsx
// Replace ApprovedGnoComponent with an approved exported component.
import { ApprovedGnoComponent } from "nmi-devops-shared-components";

export default function Page() {
  return <ApprovedGnoComponent />;
}
```

Keep application routes, data fetching, authentication, analytics, and other integrations in the consuming application unless the component contract explicitly says otherwise.

## 4. Find component-specific guidance

Run the showcase and open `/catalog` to find each approved component's:

- purpose and supported states
- public props, events, and configuration
- JavaScript and TypeScript examples
- responsive and accessibility notes
- stylesheet and installation requirements
- link to its dedicated Storybook story

Storybook is the isolated engineering reference; the catalog is the consumer onboarding reference.

## 5. Keep versions predictable

Use the package version shown in the component catalog. Follow the package changelog when upgrading. Breaking prop, export, token, or behavior changes require migration notes.
