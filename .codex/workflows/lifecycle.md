# Adaptive AI-DLC lifecycle

[AGENTS.md](../../AGENTS.md) is the authority for gates and scope.
This lifecycle is GNO's adaptation of AI-DLC, not a claim of certification.
Use [templates](../../specs/templates/README.md) for artifacts.

## Session entry and query routing

Every session begins by applying the [query router](query-routing.md). Reclassify
when the user's objective materially changes. A single-stage query goes directly
to its primary role; a multi-stage query routes to Atlas for sequencing. Routing
selects responsibility and applicable skills, but never grants an approval.

During repository adoption, identify every language, runtime, and framework in
the affected scope and record the selected skill for each delivery unit. PHP
uses PHP-FIG; JavaScript/TypeScript, Node.js, and JavaScript-framework changes
use the JavaScript framework skill. Mixed-stack work uses all applicable skills
and records cross-stack integration and validation in the approved plan. For
another stack, load a repository-provided or approved ecosystem skill. If none
exists, record the gap and propose a focused skill or human-owned convention
before development approval; do not proceed on invented standards. Skills are
selected and loaded by the active role, not dynamically spawned.

## Inception: intent, context, and an approved plan

Atlas identifies the business outcome, task type, affected repositories,
risk, execution owner, and desired endpoint (PR handoff or production).
Athena verifies repository paths, applicable instructions, branch/base and
working-tree state, architecture, tests, CI, database/API strategy, and constraints.
For greenfield work, record proposed choices instead of claiming adoption evidence.

Reuse an adoption record only after checking changes since its recorded revision.
Record what was rechecked. Complete requirements and acceptance criteria, with
measurable nonfunctional requirements where relevant. Ask about material unknowns;
never promote assumptions into approved requirements.

Planning is collaborative: provide concise decision rationale, useful suggestions,
alternatives and tradeoffs, and focused questions about material unknowns. Record
answers and distinguish verified facts, assumptions, recommendations, and approved
decisions. Continue independent investigation while waiting for answers; resolve
blocking decisions before finalizing the affected plan.

Complete the [initial setup record](../../specs/templates/initial_setup.md)
before development: exact paths and revision, runtime/tool versions, dependency
commands, configuration sources without secrets, local services, safe fixtures,
startup and test commands, expected results, and actual readiness evidence.
For greenfield work, label setup choices as proposed until verified; authorized
scaffolding may establish them as the first unit, before dependent feature work.
Unavailable prerequisites remain explicit blockers with an owner and next action.

Propose an execution plan selecting stages, documentation depth, delivery units,
dependencies, owners, and a definition of done. Requirements approval precedes
development planning completion. Development approval covers the final design
and implementation/test plan. Neither approval implies commit or push approval.
For an intended package release, the plan also records the proposed SemVer impact
and the release-impacting files that must be complete before final verification
and independent review. Finalize the exact version when the delivery contents are
known; do not defer routine version, changelog, migration, Storybook/catalog, or
consumer-document preparation until after merge.

Use functional/data/API design and decision records when behavior or interfaces
change. Consider security, reliability, performance, accessibility, deployment,
and rollback according to impact. A small fix may use a concise design note.

## Adaptive paths and artifacts

| Path | Typical depth |
| --- | --- |
| Small fix or documentation change | Compact report, relevant adoption refresh, focused plan and checks |
| Feature or cross-repository change | Full requirements/design, units, numbered evidence, integration checks |
| High-impact migration or release | Full design, migration/rollback, broader regression and operations evidence |
| Incident hotfix | Focused impact and rollback analysis, targeted validation, explicit gates |

Record omitted or combined stages and reasons in state.md before plan approval.
Do not skip approvals, relevant tests, or independent review for speed.
N/A means inapplicable with rationale, never failed or not attempted.
Combine documents when useful; completeness of evidence matters more than count.

## Construction: repeat per delivery unit

1. Forge implements the approved unit using existing conventions and writes
   appropriate tests. Record requirement-to-file mapping and the exact change set.
   When the unit is intended for package release, complete the release-impacting
   tracked files in the same candidate: aligned root/package/lockfile versions,
   changelog, Storybook/catalog guidance, consumer documents, and migration notes
   as applicable.
2. Vera completes required unit tests plus relevant build, integration,
   regression, and acceptance checks. Record commands, environment and revision.
   Create a standalone manual_testing.md from the
   [QA template](../../specs/templates/manual_testing.md), even in compact mode.
   Link it from the testing report and state; identify the QA recipient and
   whether it is prepared, sent, or executed. Do not send it without authorization.
   Populate repeatable positive, negative, and relevant regression cases with
   expected results. Record actual results only after execution; required unrun
   cases are BLOCKED. If manual checks are inapplicable, retain the document with
   a reason. Refresh affected cases after corrections and preserve prior results.
   Before recommending review for an intended release, verify the version,
   changelog, Storybook/catalog, consumer-document, migration, and package-dry-run
   evidence that applies to the release-complete candidate.
3. Pre-review failures return to implementation within the already approved scope.
   Re-run affected checks. A new requirement or material design change returns
   to Inception for approval; this is not a code review adjustment.
4. After passing checks, Argus independently reviews the release-complete local
   diff against its recorded base and the approved requirements/design. No PR is
   needed yet. Release-impacting tracked files added after this review require
   affected verification and refreshed independent review before commit.
5. For findings, prepare an adjustment plan and obtain review-adjustment approval.
   Forge applies only approved corrections; Vera validates those corrections and
   affected regressions. Argus confirms required findings are resolved.
6. Repeat until passing, or record a blocker. PARTIAL or FAIL adjustment validation
   does not permit commit. No findings means a recorded N/A for adjustments.

For PR review comments, Atlas or the repository owner posts the result only
after the correction is committed and validated. Use the same Markdown reply
fields for every finding: PR, disposition, adjustment status, finding,
assessment, correction, files changed, validation, adjustment-record link, and
commit. Store the linked record as
`<sequence>_pr<PR-number>_<scope>_code_review_adjustment_<YYYY-MM-DD>.md`.
The status reports the adjustment state, never the next workflow step. Orion
provides delivery details but does not decide or author the technical finding
resolution by default.

In compact mode, record this sequence in one report. In full mode, preserve
reports 05-10 per unit/iteration in linked subdirectories or append dated
iterations; do not overwrite prior evidence. Complete cross-unit integration
checks before release readiness. Independent review can be a separate authorized
agent or a human reviewer; an implementer's self-check is not equivalent.

## Git delivery and Operations

Orion verifies requirements, tests, review, and adjustment evidence against the
proposed change set, then prepares the commit summary. Obtain commit approval
before staging only the approved files and committing. Record the resulting hash.

Present the full push summary specified in AGENTS.md; obtain explicit push
approval after that summary. Push only the approved revision and target.
Verify remote result. Prepare the PR title/body/base/head and obtain separate
PR approval before creating it. Record the real PR URL or a preparation-only state.

If merge/deployment is in scope, validate required CI and approved revision,
obtain the corresponding approvals, and record merge/deployment results.
The user or authorized repository owner performs the final merge. Once that
owner confirms a PR has merged to `master`, Orion begins release readiness for
the merged revision: verify the target commit and required checks, aligned root,
package, and lockfile versions, changelog entry, and release documentation. This
is normally a verification-only
stage after the single release-complete PR; it does not routinely create a
commit or repeated PR. Missing or incorrect tracked preparation returns as a
blocker to Atlas and must be completed through a new validated and reviewed PR
before readiness is repeated. Orion then presents the exact version tag, target
commit, remote, command, and resulting GitHub Actions release behavior. The tag
push is the final agent-executed release action and requires its own explicit
approval; a PR merge alone never authorizes tagging or package publication.
After the approved push, Orion verifies the workflow run and release asset.
Plan release order for dependent repositories, database compatibility, backups
where needed, rollback triggers/commands, responsible owners, and environments.

Verify the deployed artifact with smoke checks and relevant acceptance criteria.
Record monitoring signals, alert ownership, incidents, and measured outcomes.
Feed production findings into new requirements or bugfixes. A failed deployment
does not authorize an unapproved destructive rollback; use the approved recovery
plan or escalate with the concrete action.

If another team owns operations, deliver the release plan and open risks to that
owner and mark "handoff complete; deployment not executed". Endpoints must be
reported accurately; PR readiness is not production readiness.

## Resume and change control

Read state.md, approvals.md, current artifacts, and repository status before
resuming. Compare actual revision and dirty changes with prior evidence.
Revalidate only affected evidence; preserve valid approvals. Re-plan if scope,
targets, or material design changes. Record superseded decisions rather than
silently rewriting history. Track each repository separately in a shared project.

Handoffs identify absolute paths, unit, requirements, revision/base, approvals,
results, blockers, owner, and next action. Do not assume instructions or permissions
in this workspace automatically apply to an external source checkout.
