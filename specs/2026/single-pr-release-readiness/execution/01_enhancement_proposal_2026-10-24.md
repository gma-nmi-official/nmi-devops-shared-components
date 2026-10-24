# Enhancement proposal: Single-PR release readiness

## Context and objective

The user selected a default release path with no repeated pull request: prepare
the complete release candidate, verify it, obtain independent review, commit and
merge one PR, perform release readiness against the merged `master` revision,
then request approval for the final tag push. The current documentation mostly
supports this path, but `README.md` orders version/changelog work after
independent review and the lifecycle frames missing release preparation only as
a post-merge blocker. The desired order must be explicit and consistent.

This is a compact workflow-only enhancement. It does not change component code,
the published package API, the current `1.2.0` package version, or the already
merged Cookie Agreement revision.

## Proposed behavior

1. Select the intended SemVer impact during planning and finalize the exact
   release version when the delivery contents are known.
2. Before Vera's final verification and Argus's independent review, complete all
   release-impacting tracked files: package/root/lock versions, changelog,
   Storybook/catalog guidance, consumer documentation, migration notes, and
   applicable release evidence.
3. Argus reviews that release-complete local change set. Approved review
   adjustments repeat affected verification and review closure as today.
4. Orion prepares the approved commit, push, and PR from the reviewed candidate.
   The user or authorized repository owner performs the merge to `master`.
5. Post-merge release readiness is a verification stage: confirm the reviewed
   commit, required checks, aligned versions, changelog, and tag target. It does
   not normally create another commit or PR.
6. A second reviewed PR is exceptional and required only when readiness finds a
   missing or incorrect tracked file. Tagging remains blocked until that PR is
   merged and readiness is repeated.
7. The final agent-executed release action is the concrete, separately approved
   tag push, followed by verification of the GitHub Actions run and release
   artifact.

Execution and approval records generated after review may record actual hashes,
URLs, and decisions, but they must not silently change release behavior or
release-impacting files outside the reviewed candidate.

## Affected files

| File | Proposed change |
| --- | --- |
| `AGENTS.md` | Make release-complete preparation before final verification/review an explicit policy rule; define post-merge readiness as verification and a follow-up PR as an exception. |
| `.codex/workflows/lifecycle.md` | Put version/docs/release-candidate completion before Vera/Argus and clarify the one-PR default through tag verification. |
| `.agents/skills/release-operations/SKILL.md` | Require Orion to verify rather than mutate the merged candidate; retain separate tag approval. |
| `.codex/agents/orion.toml` | Align Orion's operating instructions with the one-PR default and exceptional correction PR. |
| `README.md` | Correct the numbered order so version/changelog preparation precedes final verification and independent review. |
| `CONTRIBUTING.md` | Align contributor sequencing and state that release readiness normally produces no tracked changes. |
| `docs/versioning.md` | State the one-PR default, pre-review version alignment, exceptional follow-up PR, and final tag-push step. |
| `prompt.md` | Ensure the reusable prompt preserves release-candidate ordering and the separate tag gate. |
| `specs/templates/execution/04_implementation_plan.md` | Capture SemVer decision and planned release-complete files. |
| `specs/templates/execution/05_development_report.md` | Record completion of release-impacting files in the delivery unit. |
| `specs/templates/execution/06_unit_testing_report.md` | Check version/changelog/docs readiness before recommending Argus review. |
| `specs/templates/execution/07_code_review_report.md` | Confirm Argus reviewed the release-complete candidate. |
| `specs/templates/execution/11_commit_summary.md` | Add release-candidate completeness to commit readiness. |
| `specs/templates/execution/14_pull_request.md` | Record whether the PR is the release-complete default or an exceptional correction. |
| `specs/templates/execution/15_release_plan.md` | Record merged revision readiness, exact tag action, approval, and workflow/artifact verification. |
| This project record | Preserve proposal, approval, implementation, validation, review, and next-action evidence. |

`CHANGELOG.md` and package versions are N/A for this enhancement because the
repository changelog and package versions describe the distributed component
package. These workflow-only files are not included in `packages/ui` package
contents and do not change consumer behavior. The N/A decision will be retained
in the execution report. No standalone workflow `VERSION` file exists.

## Compatibility and risks

- Approval gates, role ownership, owner-only merge policy, and independent review
  remain unchanged.
- Existing projects may keep valid approvals and evidence. The clarified order
  applies when preparing their next release-impacting candidate.
- Projects intentionally bundling several completed features may still use one
  coordinated release PR; that exception must be planned rather than inferred.
- Operational records must remain factual after Git actions. They cannot be used
  to introduce unreviewed release changes.
- The main risk is over-constraining documentation-only or non-release work. The
  text will apply release-complete checks only when a package release is intended.

## Validation plan

1. Inspect the final diff for consistent ordering across policy, lifecycle,
   skills, agent instructions, contributor docs, and templates.
2. Search for contradictory guidance that places version/changelog work after
   Argus or treats post-merge readiness as routine implementation.
3. Parse `.codex/agents/orion.toml` to confirm valid TOML structure.
4. Validate relative Markdown references in every changed file.
5. Run `git diff --check`.
6. Run the repository documentation/configuration checks that apply without
   changing application code; script positive/negative tests are N/A because no
   validator or setup script is changing.
7. Obtain independent Argus review of the implemented workflow diff. Any finding
   requires a separately approved adjustment plan before correction.

## Approval requested

Approve implementation of the proposed behavior in the exact affected-file set
above, with the stated compatibility decisions and validation plan. This does
not authorize commit, push, PR creation, merge, tag push, release publication,
or deployment.
