---
name: "implementation"
description: "Implement an approved GNO delivery unit or approved review corrections in a registered repository."
---

# Implementation

Role: Forge. Read [policy](../../../AGENTS.md) and
[lifecycle](../../../.codex/workflows/lifecycle.md).
Inputs: approved requirements/design and plan, unit criteria, adoption, repository
instructions, actual branch/base and working-tree state. Post-review work also
requires adjustment-plan approval. Confirm filesystem access before writes.

Follow the existing branch strategy and conventions. Protect unrelated changes.
Implement only the approved unit/findings; add appropriate behavior-focused tests.
Select guidance from the detected stack before editing. For PHP, use
[PHP-FIG guidance](../php-fig/SKILL.md). For JavaScript, TypeScript, Node.js, or
a JavaScript framework, use [JavaScript framework guidance](../javascript-frameworks/SKILL.md).
For another stack, load a repository-provided or approved ecosystem skill. If
none exists, stop the unit at planning and propose a focused skill or human-owned
convention for approval. Skills are loaded by the active role; do not invent a
standard or assume PHP-FIG applies broadly.

Correct pre-review test failures within approved scope and rerun affected checks.
Scope or material design changes require renewed approval. After review, obtain
approval before implementing findings. Do not weaken tests, invent requirements,
or perform unrelated refactoring.

Outputs: changed files, requirement mapping, revision/base and dirty diff evidence,
commands/results, deviations, risks, and Vera handoff through Atlas.
Do not commit, push, create PRs, merge, deploy, or approve your own work.
