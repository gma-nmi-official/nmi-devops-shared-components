# Package and component versioning

## One package, one release version

`nmi-devops-shared-components` is distributed as one `.tgz` package attached to a GitHub Release. Components are organized and documented independently, but they do not have independent package versions. The private workspace root is `nmi-devops-shared-components-workspace`; only `packages/ui` owns the consumer package identity.

For example, a `PortalHeader` enhancement is released by updating the package from `0.2.0` to `0.3.0`. A consumer installs the package version, not a component-specific version.

The root workspace version and `packages/ui/package.json` version must remain aligned. The lockfile must be updated when package metadata changes. The initial stable package release is `1.0.0`; its major bump records the package-identity migration described in the changelog.

## How to select the version bump

Select the highest-impact public change in the release:

| Change | Package bump | Example |
| --- | --- | --- |
| Bug, accessibility, documentation, or non-breaking style fix | Patch | `0.2.0` → `0.2.1` |
| New component or backward-compatible capability | Minor | `0.2.1` → `0.3.0` |
| Removed export, renamed prop, breaking event, token, behavior change, or consumer package-ID rename | Major | `0.3.0` → `1.0.0` |
| Consumer validation before stable release | Pre-release | `0.3.0-rc.1` |

Component scope determines what changed; package impact determines the version bump.

## Release decision examples

- Add optional `PortalHeader` navigation configuration: **minor**.
- Fix mobile menu keyboard focus in `PortalHeader`: **patch**.
- Rename `PortalHeader`'s `navigation` prop: **major**.
- Rename the package ID: **major**; consumers must install the new artifact and update package and stylesheet imports.
- Add `PortalFooter` and fix a `PortalHeader` bug in one release: **minor**, because minor is the highest required bump.
- Update internal build scripts without changing `dist`, exports, styles, or consumer behavior: **no package release**.

## Required changelog entry

Before a release:

1. Move completed items from `Unreleased` into a dated version section.
2. Identify the affected component(s) and public package surface.
3. State whether the change is patch, minor, major, or pre-release.
4. Add migration instructions for breaking changes.
5. Record validation evidence: typecheck, lint, tests, Storybook build, Next.js build, and `npm pack --dry-run` as applicable.
6. Align the root and `packages/ui` versions and update the lockfile.

## Tagged GitHub release

Include the release version and changelog entry in the reviewed PR. After the user or authorized repository owner merges the PR to `master`, Orion begins release readiness for that merged revision. Verify required checks, changelog, and matching root and package versions. If preparation is missing, complete it in a follow-up PR rather than tagging an incomplete release.

Once release-ready, Orion presents the exact annotated tag, target commit, remote, and push command. Explicit approval is required because pushing the tag triggers GitHub Actions to create the release and publish its asset. Then create and push the annotated tag:

```bash
git tag -a v1.0.0 -m "release: nmi-devops-shared-components v1.0.0"
git push origin v1.0.0
```

GitHub Actions runs [`.github/workflows/release.yml`](../.github/workflows/release.yml) for tags matching `v*`. It verifies that the tag matches both package versions, runs the full quality gate, and writes the installable artifact to `release-artifacts/`:

```bash
npm run check
npm run pack:release
```

The workflow attaches `nmi-devops-shared-components-<version>.tgz` to the matching GitHub Release using the workflow's `GITHUB_TOKEN`. The package is not published to the public npm registry. Consumers install the release asset using the URL pattern documented in [`consumer-setup.md`](consumer-setup.md). This repository is private, so consumer developers and build environments must have repository access and authenticate to download private release assets. The former package ID was `gno-shared-components`; consumers of that artifact must migrate to the new package and import name.

Pushing the tag starts the workflow and creates the release; it does not replace the separate approval required before pushing a tag. Do not reuse a tag for a different package version or artifact.

## Future option: independent component packages

Independent component versions may be introduced later only if release cadence, dependency boundaries, or package size justify multiple published packages. That would be a separate architecture decision and migration, not an implicit change to the current policy.
