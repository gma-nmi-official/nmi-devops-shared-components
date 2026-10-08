# Independent code review: GNO shared-components foundation

## Review context

- Reviewer: Argus role
- Date: 2026-10-02 Asia/Shanghai
- Repository: `repository checkout root`
- Base revision: `ef5546d0dcf953d0fed2e4b844d425d3814f6e98`
- Branch: `master`
- Scope: local foundation change set only; no `portal_header` implementation
- Validation supplied: typecheck PASS, lint PASS, no-test baseline PASS, package build PASS, Next.js build PASS, package dry-run PASS

## Findings

### F-001 — Major — publish configuration cannot represent the intended package visibility

- Requirement: package must be consumable/publishable by other repositories (R-001/R-009).
- Location: `packages/ui/package.json:2,22`.
- Evidence: package name is unscoped `gno-shared-components`, while `publishConfig.access` is `restricted`. npm documents that unscoped packages are always public and cannot be published as restricted. The package also declares `UNLICENSED`, which conflicts with an unscoped public distribution decision.
- Impact: the first publication command will not match the documented private-package workflow and the intended visibility is ambiguous. The package is not release-ready until visibility is decided.
- Required correction: choose one approved contract: (a) retain exact unscoped `gno-shared-components`, remove restricted access and make the package intentionally public with an appropriate license; or (b) use an approved scope/private registry and rename the published package accordingly.
- Validation: `npm pack --dry-run`; authenticated publish dry-run or registry metadata check using the approved target; consumer `npm install` from the target registry.

### F-002 — Major — workspace root and publishable workspace share the same package name

- Requirement: package-first workspace with a distinct consumer showcase/orchestrator (R-001/R-002).
- Location: `package.json:2,21` and `packages/ui/package.json:2`.
- Evidence: `npm ls gno-shared-components --depth=0` reports the root as `gno-shared-components@0.1.0` with a dependency on another `gno-shared-components@0.1.0 -> ./packages/ui`. The private root and publishable child therefore have the same identity.
- Impact: tooling, release commands, dependency diagnostics, and future package metadata can confuse the orchestrator with the artifact. It also makes the root appear to be consuming itself.
- Required correction: give the private root a distinct repository/workspace name (for example `gno-shared-components-workspace`) while keeping the child package name as the approved consumer package; retain only the explicit workspace dependency needed by the showcase.
- Validation: clean `npm ci`; `npm ls`; `npm run check`; package dry-run must identify only the child package as the publishable artifact.

### F-003 — Minor — replacement `.gitignore` omits standard generated/secrets exclusions

- Requirement: preserve repository hygiene and prevent accidental generated/secrets commits (R-010/NFR-004).
- Location: `.gitignore:1-11`.
- Evidence: the replacement removes the scaffold's `/out`, `/build`, `.vercel`, debug log, `.pnp`, `.yarn`, `.DS_Store`, and `*.pem` exclusions.
- Impact: future builds, deployment metadata, credentials/certificates, and package-manager artifacts may appear as commit candidates.
- Required correction: restore relevant standard exclusions while keeping the new workspace/package exclusions.
- Validation: generate representative `.next`, `out`, `build`, `.vercel`, log, pem, and package artifacts and confirm they remain ignored.

### F-004 — Minor — README consumer snippet is not executable JSX/TypeScript

- Requirement: catalog and README must provide copyable consumer import guidance (R-012/R-013).
- Location: `README.md:23-25`.
- Evidence: `import { /* ApprovedGnoComponent */ } from ...` is a placeholder with an empty named-import list and cannot be compiled.
- Impact: the first consumer-facing example teaches an invalid import syntax while no component is currently available.
- Required correction: use prose/placeholder pseudocode outside a code block, or add an explicitly marked future example that is not presented as executable code.
- Validation: README example review; when the first component is added, compile the copied example in a consumer fixture.

## Positive observations

- The package has explicit exports, CSS side-effect metadata, React peer dependencies, and a compact packed artifact.
- The Next.js showcase consumes the workspace package by name and the catalog has an explicit empty-inventory state.
- Generated output is ignored and the quality workflow runs the complete local gate.
- No account/SSO, GA, cookie agreement, or portal-header implementation was introduced in this foundation scope.

## Review decision

BLOCKED pending required corrections F-001 and F-002. F-003 and F-004 should be corrected in the same approved adjustment to keep the foundation commit clean. This report does not authorize corrections, commit, push, or publication.
