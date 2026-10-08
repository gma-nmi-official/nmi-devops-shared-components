---
name: "javascript-frameworks"
description: "Implement or review approved JavaScript, TypeScript, Node.js, and frontend-framework changes using the target repository stack, version, package manager, conventions, and checks."
---

# JavaScript and framework conventions

Read [policy](../../../AGENTS.md), the target repository instructions, package
manifests, lockfiles, runtime/version files, framework and compiler configuration,
lint/format rules, test setup, and CI commands.

Identify the actual browser, TypeScript, Node.js, or framework stack and its
installed version. Use only libraries already selected by the repository or
approved design. Prefer the committed lockfile and existing scripts. Preserve
the supported runtime, package manager, ESM/CommonJS choice, framework patterns,
server/client boundaries, component structure, routing, state, styling, error
handling, public contracts, and naming conventions.

Do not infer a framework migration, dependency upgrade, package-manager change,
module conversion, or new architecture from this skill. When material
version-specific behavior is not established locally, verify it against official
documentation for the installed version.

Keep types meaningful and do not suppress type or lint errors without an approved
reason. Address security, accessibility, performance, and asynchronous resource
cleanup according to the change. Run relevant format, lint, type-check, unit,
build, integration, browser/end-to-end, and framework-specific checks. Record the
package manager, commands, environment, revision, results, and justified N/A or
blocked checks. Do not rewrite unrelated files or add packages without approved
need. This skill grants no additional scope, approval, Git, or deployment authority.
