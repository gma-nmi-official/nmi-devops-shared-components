# GNO Workflow startup and maintenance prompt

You are working in the GNO shared-components repository with a vendored GNO workflow. Read [AGENTS.md](AGENTS.md),
[README.md](README.md), [query routing](.codex/workflows/query-routing.md), and
[lifecycle](.codex/workflows/lifecycle.md).
These checked-in documents and configurations are the framework; do not
regenerate them merely because this prompt was invoked.

## First use

Inspect repository state, user changes, package version, agent/skill files,
local specifications, and repository registry. Confirm that `.codex/`,
`.agents/`, `specs/templates/`, and the required instruction files are present.
Install dependencies with `npm ci` and run the applicable repository checks,
including `npm run check`, when the task requires runtime verification.
If a required workflow file or check is unavailable, report the concrete gap.
Do not begin project development until the framework is structurally ready.
Do not overwrite existing files or relocate application repositories.

Confirm client discovery of the six agents: Atlas, Athena, Forge, Vera, Argus,
and Orion. Skills live in .agents/skills; agent definitions are TOML under
.codex/agents. Registry paths do not grant filesystem access or propagate
instructions to external repositories.

## Project work

Classify every new or materially changed query before substantive work. Select
the primary named role from the query router. Use Atlas for mixed or end-to-end
work; otherwise use the specialist for the immediate outcome. If delegation is
not available or authorized, follow that role's skill in the current session.
Never treat an implementer's self-review as independent.

Use Atlas's coordination procedure to choose the appropriate path and depth.
Inspect adoption evidence, capture intent/requirements, then prepare design,
nonfunctional requirements, delivery units, and test plan as applicable.
Include concise planning rationale, suggestions, alternatives, and questions for
material unknowns. Record concrete initial setup and prerequisite evidence using
the initial setup template before dependent development.
Use explicit approvals already granted for the same scope; otherwise request
the applicable decision after its artifact is ready to review.

Follow the lifecycle's implementation/test/review loop. Review local changes;
a PR is not required before review. Failed pre-review tests return to scoped
implementation. Post-review corrections require adjustment approval.
During verification, create the standalone manual_testing.md reference for QA
from its template, link it in the report and state, and record the recipient and
handoff status. Unrun required manual checks remain BLOCKED.

For implementation, inspect the actual affected languages and repository
configuration, then select and load matching guidance. Use PHP-FIG guidance for
PHP and JavaScript framework guidance for JavaScript, TypeScript, Node.js, or
framework-owned code. Use both for mixed-stack work. For another stack, use an
existing repository or approved ecosystem skill; if none exists, record a
planning blocker and propose a focused skill or human-owned convention. Skills
are loaded by the role, not spawned dynamically, and no standards are invented.
Preserve repository versions, package manager, and checks.

Maintain state, approval history, revision-linked evidence, and next action
under specs/<year>/<project>. Use separate commit, push, PR, and applicable
merge/deployment gates from AGENTS.md. Never infer one from another.

## Framework maintenance

Use the [enhancement workflow](.codex/workflows/enhancement.md).
Prepare affected files, behavior changes, compatibility, and validation plan.
Implement only an explicitly approved adjustment. Keep setup, validator,
agents, skills, workflows, templates, README, changelog, and version aligned.
Report what changed, checks/results, limitations, review status, and next action.
Do not start application development while maintaining the framework.
