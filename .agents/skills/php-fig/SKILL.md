---
name: "php-fig"
description: "Apply relevant PHP-FIG standards to approved new or modified PHP code while respecting repository conventions and scope."
---

# PHP-FIG within existing repositories

Read [policy](../../../AGENTS.md) and the target repository instructions.
Inputs: approved change, PHP/runtime constraints, composer configuration,
existing formatter/static-analysis tools, and coding conventions.

Determine which standards apply to touched code and the supported runtime.
Use repository tooling and verify uncertain standards against primary sources.
Do not upgrade dependencies, introduce frameworks, or reformat unrelated files
solely for compliance. Raise conflicts with approved requirements or architecture
as decisions instead of performing a mass rewrite.

Output applicable conventions and scoped checks/results in the development/test
handoff. This skill grants no additional approval.
