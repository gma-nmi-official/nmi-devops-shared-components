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
Implement only the approved unit/findings; add appropriate behavior-focused tests
and implementation-adjacent documentation when the approved change requires it
(including Storybook, catalog, consumer, migration, or execution records).
Select guidance from the detected stack before editing. For PHP, use
[PHP-FIG guidance](../php-fig/SKILL.md). For JavaScript, TypeScript, Node.js, or
a JavaScript framework, use [JavaScript framework guidance](../javascript-frameworks/SKILL.md).
For another stack, load a repository-provided or approved ecosystem skill. If
none exists, stop the unit at planning and propose a focused skill or human-owned
convention for approval. Skills are loaded by the active role; do not invent a
standard or assume PHP-FIG applies broadly.

Use readable, reviewable code formatting: prefer one operation or decision per
line, multiline conditionals/object literals/calls when they carry behavior,
and named helpers for non-trivial branches. Avoid compressed semicolon blocks,
nested one-line control flow, and dense destructuring that hides side effects.
Use indentation to make nesting, ownership, and control flow immediately
visible. Add intentional line breaks between distinct operations, and expand
nested JSX, CSS rules, conditionals, calls, and data structures when keeping
them on one line makes the code harder to understand. Keep formatting changes
behavior-neutral and follow any repository formatter or linter already in use.

Correct pre-review test failures within approved scope and rerun affected checks.
Scope or material design changes require renewed approval. After review, obtain
approval before implementing findings. Do not weaken tests, invent requirements,
or perform unrelated refactoring.

Outputs: changed files, requirement mapping, revision/base and dirty diff evidence,
commands/results, deviations, risks, and Vera handoff through Atlas. Before
handoff, check for approved-scope leftovers such as missing linked documents,
stale evidence, unresolved TODOs, and unintended generated artifacts. Preserve
user-owned files and report them separately rather than deleting them.
Do not commit, push, create PRs, merge, deploy, or approve your own work.
