# GNO shared components

This repository is dedicated to configurable, reusable GNO portal components for JavaScript and TypeScript consumer applications.

The package foundation and consumer catalog are initialized, but no public components are currently exported. Approved GNO components will be added with their runtime API, styles, tests, stories, and catalog documentation.

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

Open `http://localhost:3000`. The component catalog is available at `http://localhost:3000/catalog`.

The catalog is the consumer-facing documentation surface. Each approved component will show its preview, supported states, configuration, import examples, stylesheet requirements, accessibility notes, and Storybook link.

### Run Storybook

```bash
npm run dev:storybook
```

Open `http://localhost:6006`. Storybook is the isolated engineering workshop for checking component states, controls, responsive behavior, interactions, and accessibility. Every approved component must have a dedicated story.

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

`npm run check` is the complete quality gate. `npm run build` builds the publishable package and the Next.js showcase. `npm run build-storybook` creates the ignored `storybook-static/` output.

### Inspect or create a package artifact

```bash
npm run pack:check
npm run pack:release
```

`pack:check` previews package contents. `pack:release` writes a versioned `.tgz` file under `release-artifacts/` for Bitbucket release handling.

## GNO workflow

The repository includes the GNO workflow so developers and agents use the same process after cloning:

1. Read [`AGENTS.md`](AGENTS.md), [`prompt.md`](prompt.md), and [`CONTRIBUTING.md`](CONTRIBUTING.md).
2. Adopt the repository and run the baseline checks.
3. Define requirements, user stories, acceptance criteria, and the component design before implementation.
4. Implement the complete delivery unit: source, exports, styles, tests, Storybook story, catalog entry, and documentation.
5. Run automated and manual verification.
6. Obtain independent review before commit.
7. Update the changelog and package version according to [`docs/versioning.md`](docs/versioning.md).
8. Create a tagged release only after the required approval.

The workflow files are available under [`.codex/`](.codex/), [`.agents/`](.agents/), and [`specs/`](specs/).

## Consumer contract

When the first component is approved, consumers will install the package and import a named export:

```bash
npm install https://bitbucket.org/<workspace>/<repository>/downloads/gno-shared-components-0.1.0.tgz
```

```tsx
// Illustrative only until the first approved public component is exported.
import { /* ApprovedGnoComponent */ } from "gno-shared-components";
import "gno-shared-components/styles.css";
```

The Bitbucket URL is the release source; `gno-shared-components` remains the package and import name. See `/catalog` while running the showcase for the current public inventory and copyable JavaScript/TypeScript examples.

For complete setup guidance, see [`docs/consumer-setup.md`](docs/consumer-setup.md).

For release and component versioning rules, see [`CHANGELOG.md`](CHANGELOG.md) and [`docs/versioning.md`](docs/versioning.md).

Tagged Bitbucket builds produce a versioned `.tgz` package artifact through `npm run pack:release`.

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

Feature branches merge to `master` only through an approved pull request. The user or authorized repository owner executes the final merge after review approval.
