# Independent review — v1.1.0 release candidate

## Review context

- Reviewer: Argus, independent and read-only.
- Date: 2026-10-23 Asia/Shanghai.
- Repository / branch: isolated worktree,
  `feature/release-v1.1.0`.
- Base: `d91ac862dda90073875d16c70bb24886d334ff98`.
- Candidate: 16 modified and two new paths under A-022 through A-025.
- Requirements: Portal Header PH-R12 / PH-AC18 and the release contract in
  `docs/versioning.md`.

## Independently reproduced evidence

| Check | Result |
| --- | --- |
| `git diff --check` | PASS |
| Root/package/lock version alignment | PASS — all `1.1.0` |
| `npm audit --omit=dev` | PASS — zero findings |
| Full `npm audit` | PASS WITH A-006 EXCEPTION — only the five-item development ESLint globbing chain |
| `npm run check` | PASS — 13 tests, two fixtures, Storybook 10.6.3, Next.js 16.4.2 |
| `npm run test:e2e` | PASS — 28/28 |
| `npm run pack:check` | PASS — `1.1.0`, 37 files |

Argus found the CSS containment/mobile-overflow corrections adequately scoped
and asserted, confirmed the dependency upgrades match A-023, and found no
generated or unrelated files in the candidate.

## Required findings

### F-REL-110 — Major — presentation exposes a false consumer contract

- Requirement: PH-R12 / PH-AC18; correct consumer and release documentation.
- Evidence:
  - `presentation/foundation-presentation.md` lines 78-112, 157-173, 195-204.
  - Equivalent HTML content around lines 103-178.
  - `packages/ui/src/index.ts` exports Portal Header only.
- Finding: the presentation advertises `v1.1.0` while importing nonexistent
  `PortalFooter`, using obsolete `PortalHeader` props (`navigation`,
  `activePath`, and `brand.label`), describing the catalog as empty and Portal
  Header as planned, and listing Portal Header implementation as excluded.
- Impact: consumers receive a non-compiling and contradictory release contract.
- Required correction: update both presentation formats to the actual released
  Portal Header API/current catalog and remove obsolete planned, empty, and
  excluded claims; alternatively archive the deck and remove all current
  `v1.1.0` instructions.
- Validation: verify retained examples against public declarations; ensure
  Markdown/HTML parity; scan for the obsolete claims; rerun documentation,
  build, browser, package, and whitespace checks.

### F-REL-111 — Minor — active guidance incorrectly says the repository is private

- Requirement: PH-R12; operationally accurate release/consumer guidance.
- Evidence:
  - `README.md` line 111.
  - `docs/consumer-setup.md` lines 7 and 16.
  - `docs/versioning.md` line 62.
  - Presentation Markdown lines 3, 110, and 253 and corresponding HTML.
  - `state.md` line 49.
- Finding: the repository is now public and Pages is successfully deployed, but
  active guidance mandates private-repository access and authenticated private
  release-asset handling.
- Impact: release instructions misstate the operating environment and impose
  unnecessary private-access assumptions.
- Required correction: describe the public repository download contract while
  retaining private-repository statements only where they are dated history. If
  CI uses authenticated GitHub CLI access, explain it as tool/rate-limit or CI
  authentication rather than private repository access.
- Validation: scan active documentation surfaces and statically verify the
  public release-download example; MT-REL-013 remains blocked until the tag and
  release asset actually exist.

## Decision

**BLOCKED.** F-REL-110 and F-REL-111 are required. No optional suggestions were
reported. Review completion grants no commit, push, PR, merge, tag, publication,
or deployment permission.
