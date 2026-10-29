# Release candidate items

## Release intent

Record the changes intended for the next batched package release after the
current review-adjustment PRs are merged. The repository currently publishes
`v1.4.0`; the candidate version is expected to be `1.4.1` because these are
backward-compatible review corrections.

## Included candidates

| Item | PR/revision | Component or scope | SemVer impact | Release status |
| --- | --- | --- | --- | --- |
| PortalHeader review corrections | PR #13, merge `92eb597e4ebe959a71f53da9e658b4e164f405d8` | PortalHeader CR-001/CR-002/CR-003 corrections | Patch | Merged to `master`; ready for batching |
| CookieAgreement review corrections | PR #14, merge `5799edf60a0454d035305123c91f23c35508caad` | CookieAgreement CR-001/CR-002/CR-003/CR-005/CR-006/CR-007/CR-008 corrections | Patch | Merged to `master`; ready for batching |
| AdSlot review corrections | PR #15, merge `ccce5781a7fd804be38827783abde438e0be96d5` | AdSlot PR #9 CR-001/CR-002/CR-003 corrections and raw-size budget preservation | Patch | Merged to `master`; ready for batching |
| Google Analytics review corrections | PR #16, merge `d14e7a38babb66e04d85dd477d3a33a133ea7f5e` | Google Analytics PR #10 CR-001–CR-013 corrections | Patch | Merged to `master`; CI passed; ready for batching |

## Excluded

| Branch | Reason |
| --- | --- |
| `feature/verification-workflow-enhancement` | Workflow-only change; not merged and requires its own PR/review lifecycle |

## Release gates

- Confirm PR #16 required CI checks passed at merge revision `d14e7a3`.
- Confirm all intended changes are present on `master` at one reviewed revision.
- Update the root and package changelog/version records for the batched release.
- Rerun the release quality gate and record exact-revision evidence.
- Obtain separate commit, tag, push, release, and deployment approvals.

## Release preparation evidence

- Release branch: `feature/release-v1.4.1` from merged `master` `d14e7a3`.
- Root/package/lockfile versions and changelog are prepared for `1.4.1`.
- Typecheck and package dry-run passed; package output is
  `nmi-devops-shared-components@1.4.1`.
- Targeted lint excluding generated browser-report artifacts and
  `git diff --check` passed. The unfiltered local lint is polluted by ignored
  `playwright-report` output; clean CI quality passed on PR #16.

## Current decision

No release commit, tag, or publication is authorized by this record. The
metadata-preparation diff is ready for commit review; after commit and push,
the release branch requires its own PR/merge and final release approvals.
