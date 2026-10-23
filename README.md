# NMI DevOps Shared Components

This repository contains configurable, reusable GNO portal components for
JavaScript and TypeScript consumer applications. The publishable package is
`nmi-devops-shared-components` and currently exports the `PortalHeader`
component.

The project includes two documentation surfaces:

- `/docs` — the interactive Storybook reference, with component states,
  controls, accessibility notes, and release information.
- `/catalog` — a friendly consumer guide with installation, configuration,
  examples, and parameter details.

## Local setup guide

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- Git

### Install dependencies

From the repository root:

```bash
npm ci
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`.

### Run the Next.js showcase and catalog

```bash
npm run dev
```

The `predev` lifecycle step builds the shared package first so a clean checkout has the package stylesheet and runtime output available to the showcase.

Open `http://localhost:3000` for the documentation landing page. The consumer
guide is available at `http://localhost:3000/catalog`, and the interactive
Storybook is available at `http://localhost:3000/docs`.

### Open the deployed documentation

The application build generates the interactive Storybook reference at `/docs`.
Every public component must have a dedicated story and documented supported
states.

### Run validation and builds

```bash
npm run lint
npm run typecheck
npm run test
npm run build:package
npm run build-storybook
npm run build
npm run check
```

`npm run check` is the complete quality gate. `npm run build` builds the publishable package, static Storybook output, and the Next.js application. `npm run build-storybook` creates the ignored `public/storybook/` output.

### Publish the documentation site

Merging to `master` starts the GitHub Pages workflow in [`.github/workflows/pages.yml`](.github/workflows/pages.yml). The site is published at `https://gma-nmi-official.github.io/nmi-devops-shared-components/` after GitHub Pages is enabled with GitHub Actions as its source.

### Inspect or create a package artifact

```bash
npm run pack:check
npm run pack:release
```

`pack:check` previews package contents. `pack:release` writes a versioned `.tgz` file under `release-artifacts/` for GitHub Release upload.

## GNO workflow

The repository includes the GNO workflow so developers and agents use the same process after cloning:

1. Read [`AGENTS.md`](AGENTS.md), [`prompt.md`](prompt.md), and [`CONTRIBUTING.md`](CONTRIBUTING.md).
2. Adopt the repository and run the baseline checks.
3. Define requirements, user stories, acceptance criteria, and the component design before implementation.
4. Implement the complete delivery unit: source, exports, styles, tests, Storybook story, catalog entry, and documentation.
5. Run automated and manual verification.
6. Obtain independent review before commit.
7. Update the changelog and package version according to [`docs/versioning.md`](docs/versioning.md).
8. After an owner-confirmed merge to `master`, Orion starts release readiness; push the version tag only after its exact target and publication effect receive separate approval.

The workflow files are available under [`.codex/`](.codex/), [`.agents/`](.agents/), and [`specs/`](specs/).

## Consumer contract

Consumers install the package and import a named export:

```bash
gh release download v1.1.0 --repo gma-nmi-official/nmi-devops-shared-components --pattern 'nmi-devops-shared-components-1.1.0.tgz'
npm install ./nmi-devops-shared-components-1.1.0.tgz
```

```tsx
import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export function SiteHeader() {
  return <PortalHeader />;
}
```

The repository and its release assets are private. Consumers need repository access and a `GH_TOKEN` authorized to download the release asset; keep it in the consumer's CI secret store and never commit it. `nmi-devops-shared-components` remains the package and import name. See `/catalog` while running the showcase for the current inventory and copyable JavaScript/TypeScript examples.

For complete setup guidance, see [`docs/consumer-setup.md`](docs/consumer-setup.md).

For release and component versioning rules, see [`CHANGELOG.md`](CHANGELOG.md) and [`docs/versioning.md`](docs/versioning.md).

Pushing an approved `v*` tag starts GitHub Actions, which validates the version, runs the quality gate, packages the `.tgz`, and attaches it to a GitHub Release. See [`docs/versioning.md`](docs/versioning.md) for the release process.

For the contributor workflow, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

The current Argus correction record is documented in [`docs/review-adjustments.md`](docs/review-adjustments.md).

## GNO workflow bundle

This repository vendors the GNO workflow configuration used by agents and developers:

- [`AGENTS.md`](AGENTS.md) — repository policy, roles, gates, and Next.js guidance
- [`.codex/agents/`](.codex/agents/) — named workflow agents
- [`.codex/workflows/`](.codex/workflows/) — lifecycle and task workflows
- [`.agents/skills/`](.agents/skills/) — discoverable implementation, review, verification, and release skills
- [`prompt.md`](prompt.md) — startup instructions for an agent session

Start by reading [`AGENTS.md`](AGENTS.md), then [`prompt.md`](prompt.md), before beginning a new delivery unit.

The workflow is intentionally configuration-only: this repository does not include
shell bootstrap or validation scripts. Local setup uses the documented npm
commands and the checked-in workflow files above.

Feature branches merge to `master` only through an approved pull request. The user or authorized repository owner executes the final merge after review approval.
