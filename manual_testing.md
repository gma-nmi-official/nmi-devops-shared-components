# Manual Testing Evidence

## Scope

Foundation verification for the shared-components repository, including the
catalog, Storybook setup, consumer documentation, vendored workflow, and
Bitbucket release-artifact flow.

## Environment

- Repository: `gno-shared-components-v2`
- Revision: `ef5546d0dcf953d0fed2e4b844d425d3814f6e98` (working tree contains
  the uncommitted foundation and approved adjustment changes)
- Node.js: `v26.10.0`
- npm: `11.19.1`
- Tester: Vera
- Date: 2026-10-08

## Cases

| ID | Requirement | Setup | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| MT-001 | Local developer setup | Repository checkout and Node/npm installed | Run `npm ci`, then start the documented Next.js development command | Dependencies install and showcase loads | Developer confirmed local setup and showcase operation; see final verification record | PASS |
| MT-002 | Catalog documentation | Development server running | Open `/catalog` and inspect component documentation and consumer examples | Catalog renders and explains component usage | Developer confirmed the catalog loads successfully in the browser | PASS |
| MT-003 | Storybook documentation | Dependencies installed | Run `npm run dev:storybook`, open `http://localhost:6006` | Storybook starts and component stories are discoverable | Storybook loaded successfully; empty state is expected before the first public story | PASS |
| MT-004 | Release artifact | Valid package version and dependencies | Run `npm run pack:release`, inspect generated tarball contents | Versioned `.tgz` is created with only package files | `gno-shared-components-0.1.0.tgz` created successfully; 7 package files reported | PASS |
| MT-005 | Generated-output hygiene | Repository checkout | Confirm `storybook-static/`, package `dist/`, `.next/`, coverage, release artifacts, and `*.tgz` are ignored | Generated outputs do not appear as tracked changes | `git check-ignore` confirmed all six generated-output patterns are ignored | PASS |

## Handoff

MT-001 through MT-005 have PASS evidence from the developer's local manual
testing or Vera's repository checks. The final verification record below is
authoritative; earlier blocked results are historical runner/permission evidence.
## Verification update — 2026-10-08

The developer reported that `npm run check` completed without errors through the Next.js production build:

```text
Creating an optimized production build ...
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data using 6 workers
✓ Generating static pages using 6 workers (5/5)
✓ Finalizing page optimization
```

Recorded result: **PASS for the reported Next.js production-build portion**. Other quality-gate commands should remain separately recorded unless their output is confirmed.

The developer also reported that `npm run pack:check` completed without errors:

```text
version: 0.1.0
filename: gno-shared-components-0.1.0.tgz
package size: 1.3 kB
unpacked size: 2.6 kB
total files: 7
```

Recorded result: **PASS for package dry-run inspection**.

The developer also reported that `npm run pack:release` created:

```text
gno-shared-components-0.1.0.tgz
```

Recorded result: **PASS for release artifact creation**. The reported `DEP0190` warning came from the packaging helper's Windows shell fallback; the helper was updated to invoke npm through its Node CLI path when available, avoiding `shell: true` during normal `npm run pack:release` execution.

Follow-up result: `npm run pack:release` completed cleanly with no `DEP0190` warning and produced `gno-shared-components-0.1.0.tgz`.

Recorded result: **PASS for clean release artifact creation**.

## Final local verification update — 2026-10-08

The developer confirmed that the previously blocked build checks completed successfully in the local writable environment:

```text
npm run build:package       PASS
npm run build-storybook     PASS
npx next build              PASS
```

Recorded result: **PASS for the previously blocked build checks**, pending final Argus review confirmation.

## Verification update — 2026-10-08 (Vera revalidation)

Automated checks executed from the repository root at revision
`ef5546d0dcf953d0fed2e4b844d425d3814f6e98`, with Node.js `v26.10.0` and npm
`11.19.1`:

| Check | Command | Result | Evidence / reason |
| --- | --- | --- | --- |
| Lint | `npm run lint` | PASS | ESLint exited 0. |
| Root typecheck | `npx tsc --noEmit --incremental false` | PASS | TypeScript exited 0 without writing `.tsbuildinfo`. |
| Package typecheck | `npm run typecheck -w gno-shared-components` | PASS | TypeScript exited 0. |
| Tests | `npm run test` | PASS | Vitest exited 0; no test files were found, which is expected for the empty foundation. |
| Package dry-run | `npm_config_cache=D:\PERSONAL_WORKFLOW\.npm-cache-temp npm run pack:check` | PASS | `gno-shared-components@0.1.0`, 7 files, tarball metadata generated. |
| Package build | `npm run build:package` | BLOCKED | Windows `EPERM` while removing `packages/ui/dist`; no build assertion ran. |
| Storybook static build | `npm run build-storybook` | BLOCKED | Windows `EPERM` while writing Storybook cache under `node_modules/.cache`. |
| Next production build | `npx next build` | BLOCKED | Windows `EPERM` while writing `.next/trace`. |

Generated-output hygiene was checked with `git check-ignore` and passed for
`storybook-static/`, `packages/*/dist/`, `.next/`, `coverage/`,
`release-artifacts/`, and `*.tgz`.

Package identity check passed: the private root is
`gno-shared-components-workspace@0.1.0`; the publishable workspace is
`gno-shared-components@0.1.0`.

The three build checks were subsequently confirmed PASS by the developer in a
writable local environment. The earlier BLOCKED results are retained as
historical evidence of the agent-runner and Windows-permission issue.

## Final verification record — authoritative status

| Check | Environment | Result | Evidence |
| --- | --- | --- | --- |
| `npm ci` and local showcase setup | Node.js v26.10.0, npm 11.19.1 | PASS | Developer confirmed local setup and showcase operation |
| `/catalog` browser check | Local development server | PASS | Catalog rendered successfully |
| `npm run dev:storybook` | Local browser at `http://localhost:6006` | PASS | Storybook loaded; empty state is expected before public stories |
| `npm run check` | Local writable environment | PASS | Developer reported no errors through production build |
| `npm run build:package` | Local writable environment | PASS | Developer confirmed package build completed |
| `npm run build-storybook` | Local writable environment | PASS | Developer confirmed Storybook build completed |
| `npx next build` | Local writable environment | PASS | Developer confirmed Next.js production build completed |
| `npm run pack:check` | Local writable environment | PASS | Version `0.1.0`, 7 package files |
| `npm run pack:release` | Local writable environment | PASS | `gno-shared-components-0.1.0.tgz` created without `DEP0190` |
| Generated-output ignore checks | Repository working tree | PASS | Generated output patterns are ignored |
