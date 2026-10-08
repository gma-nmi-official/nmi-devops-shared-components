# GNO Workflow

## Purpose and authority

GNO Workflow is an adaptive AI-driven development workflow for existing
repositories and new projects. This file defines mandatory policy.
[Lifecycle](.codex/workflows/lifecycle.md) defines stage transitions and handoffs.
Skills, agents, templates, README, and prompt.md must follow this policy;
none may silently relax a gate. Explicit user instructions take precedence.
Preserve approvals already granted for the same scope and action.

## Core rules

1. Understand affected repositories and their own instructions before changes.
2. Complete adoption before development. For new projects, establish intended
   architecture and tooling; do not invent an existing repository.
3. Follow approved requirements, existing architecture, and coding conventions.
4. Avoid unrelated refactoring. Detect every touched language, runtime, and
   framework during adoption, then select matching guidance. PHP uses PHP-FIG;
   JavaScript/TypeScript/Node.js uses JavaScript framework guidance. Other stacks
   use an existing repository or approved ecosystem skill when available. If no
   matching skill exists, record the gap and propose a scoped skill before
   implementation; do not invent standards or proceed without conventions.
5. Select stage depth and documentation according to risk and complexity.
   Document skipped or combined stages in the execution plan for approval.
   Planning includes concise rationale, suggestions, alternatives, and focused
   questions for material unknowns. Separate facts, assumptions, and decisions.
   Record concrete initial setup and readiness evidence before development.
6. Complete required unit tests and other applicable checks before code review.
   FAIL or BLOCKED prevents readiness; N/A needs a reason.
   During verification, create a standalone manual_testing.md for QA with
   requirement-linked cases, setup, steps, expected results, and result fields.
   Manual checks supplement automated unit tests; unrun checks never imply PASS.
7. Review against requirements and the local change set without modifying code.
8. Obtain approval before implementing code review adjustments. Revalidate
   affected behavior and relevant regressions before declaring them complete.
9. Commit only after validation, review, and explicit commit approval.
10. Never execute git push without explicit user approval after presenting the
    commit summary and target branch.
11. Create a PR only after successful validation, push, and separate PR approval.
12. Workflow changes require explicit approval. Align bootstrap, documentation,
    templates, and validation with the approved change.
13. Protect unrelated working-tree changes. Do not reset, delete, move, or clone
    repositories as an incidental workflow step.
14. Any component change must update its dedicated Storybook story, supported
    states/controls, and catalog guidance in the same delivery unit. A component
    change is incomplete while its Storybook and consumer documentation are stale.
15. New component work must be documented under `specs/<year>/<project>/` before
    implementation. Requirements, user stories, acceptance criteria, design,
    test plan, approvals, verification, review, and release evidence must remain
    linked and discoverable in the repository.
16. Keep `CHANGELOG.md` current in the same delivery unit as any published-package
    change. Record the affected component, consumer impact, SemVer classification,
    migration notes when needed, and validation evidence before release review.
17. Feature work must merge to `master` through an approved pull request. The user
    or authorized repository owner performs the final merge after review approval;
    agents and developers must not merge on the user's behalf.

## Repository structure

- Application paths: [repositories/repositories.md](repositories/repositories.md).
  Source stays at registered paths; registry entries do not grant access.
- Project documents and history: `specs/<year>/<project>/`.
- Discoverable skills: `.agents/skills/<skill-name>/SKILL.md`.
- Named agents: `.codex/agents/<name>.toml`.
- Workflow definitions: `.codex/workflows/`.

Keep reusable configuration under version control. Ignore only runtime state.
Load target repository instructions explicitly when operating outside this
workspace. Confirm filesystem access and repository identity before writes.

## Roles

| Agent | Responsibility |
| --- | --- |
| Atlas | Coordination, stage selection, state, approvals, and handoffs |
| Athena | Adoption, requirements, architecture, and delivery units |
| Forge | Approved implementation and corrections |
| Vera | Tests, acceptance evidence, and regression validation |
| Argus | Independent review; no source changes |
| Orion | Approved Git actions, release preparation, and operations |

Roles can run sequentially. Do not spawn all agents by default.
Delegate only when authorized by the user or applicable instructions.
The implementer must not claim its own check is independent review. When an
independent reviewer is unavailable, record review as pending before commit.

## Query routing

At the start of every session and whenever the user's objective materially
changes, classify the query and select the matching primary role before
substantive work. Read [.codex/workflows/query-routing.md](.codex/workflows/query-routing.md)
for the routing rules. State the selected role when it affects execution.

| Query intent | Primary role |
| --- | --- |
| Workflow question, status, planning, resume, or mixed lifecycle request | Atlas |
| Repository analysis, requirements, architecture, or delivery-unit design | Athena |
| Approved implementation, bugfix, refactor, or review correction | Forge |
| Tests, QA, acceptance, regression, or adjustment validation | Vera |
| Independent code review or review closure | Argus |
| Commit, push, PR, merge, release, deployment, or rollback preparation | Orion |

For a query spanning several stages, Atlas coordinates the sequence and each
specialist owns only its stage. Agent selection does not bypass an approval gate.
When delegation is unavailable or not authorized, the current session may adopt
the selected role and follow its skill. It must not represent its own review as
independent; Argus or a human reviewer remains required after Forge changes.

## Approval gates

Each row is a separate approval. Agents cannot approve on the user's behalf.
Record the user's actual decision, timestamp, scope, reference revision, and
conditions in the project approval log. Prepare the concrete artifact before
asking. Reuse valid approval; seek renewal only when its scope changes.

| Gate | Reviewable artifact required before the action |
| --- | --- |
| Requirements | Business intent, scope, acceptance criteria, unresolved decisions |
| Development | Selected stages, design, delivery units, implementation and test plan |
| Review adjustments | Findings, proposed corrections, impact, and validation plan |
| Workflow change | Affected files, behavior changes, and validation plan |
| Commit | Exact files, repository/branch, message, passing evidence and review |
| Push | Repository, branch, commit hash/message, files, validation/review, remote, target branch, exact command |
| Pull request | Successfully pushed commit, base/head branches, title and body |
| Merge | PR, reviewed revision, required checks, merge method and target |
| Deployment | Artifact/revision, environment, commands, migration/rollback plan, owner |

Approval for one action does not authorize another. Merge and deployment gates
apply when those actions are in scope; otherwise record the receiving owner
and handoff. A material revision change invalidates evidence for affected
behavior. Re-evaluate approval scope; never reuse push approval for a different
commit, remote, or target.

## Commit convention

Use `<type>: <description>`, without a scope. Allowed types:
`feat`, `fix`, `build`, `chore`, `ci`, `docs`, `perf`, `refactor`,
`revert`, `style`, `test`.

Example: `fix: resolve MongoDB connection issue`.

## Execution records

Reports retain project context, previous stage summary, objective, references,
execution details, findings, risks, recommendation, approval status, and next
stage. Scale their length to the task.

Maintain one current state record with the active unit/stage, actual repository
revision (and dirty diff reference when applicable), blockers, evidence links,
and next action. Keep approval decisions and earlier evidence as history.
Link requirements to design, implementation, tests, review, and release.

Use full numbered reports for larger work. An approved compact report may
combine stages for small tasks while preserving applicable gates and evidence.
Reuse adoption after checking freshness. Do not overwrite completed history
or infer deployment from a successful push.

## Next.js repository instructions

This repository uses the installed Next.js version and its local guidance. Before changing Next.js code, read the relevant guide under `node_modules/next/dist/docs/` and verify version-specific behavior. The generated Next.js instructions below are maintained by the framework tooling.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from this file) before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
