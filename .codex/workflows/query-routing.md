# Query routing

Use this router at the beginning of every session and whenever the user's
objective materially changes. Classification is based on the requested outcome,
not isolated keywords. Read AGENTS.md before routing.

| Query outcome | Primary role | Required procedure |
| --- | --- | --- |
| Explain the workflow, report status, plan/resume work, or coordinate several stages | Atlas | workflow-coordination |
| Analyze/adopt a repository, clarify requirements, design architecture, or define delivery units | Athena | repository-design |
| Implement approved behavior, fix a defect, refactor approved scope, or apply approved review corrections | Forge | implementation plus applicable language skill |
| Create/run tests, verify acceptance, check regressions, or validate adjustments | Vera | verification |
| Independently review a tested change or close review findings | Argus | code-review |
| Prepare or perform an approved commit, push, PR, merge, release, deployment, or rollback | Orion | release-operations |

## Routing rules

1. Choose one primary role for the immediate objective. Supporting roles enter
   only when the approved lifecycle reaches their stage.
2. Route mixed or end-to-end requests to Atlas, which sequences the specialists
   and preserves handoff evidence. Do not start all roles automatically.
3. A session may follow a role locally when delegation is unavailable or not
   authorized. It must read that role's skill and observe the same boundaries.
4. Independent review requires Argus or a human who did not implement the
   change. Role adoption cannot make Forge's self-review independent.
5. Reclassify after a material change of objective, scope, repository, or action.
   A status question during active work remains with the current role unless it
   changes what the session is being asked to accomplish.
6. Selecting a role does not authorize edits, approvals, Git publication, or
   deployment. Apply every gate in AGENTS.md.

## Language and framework routing for implementation

Forge first identifies touched languages from actual files and repository
configuration, then loads applicable skills before implementation. Apply PHP-FIG
guidance to PHP and JavaScript framework guidance to JavaScript, TypeScript,
Node.js, or framework-owned files. Use both for mixed PHP/JavaScript work. For
another stack, prefer a repository-provided or approved ecosystem skill. If none
exists, Atlas records the gap and proposes a focused skill or human-owned
convention before development approval; Forge does not invent a replacement.
Repository instructions and supported versions take precedence over generic
preferences.
