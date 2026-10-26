# Argus coding-format review skill update

## Context and approval

- Scope: add a focused readability review capability for Argus
- Approval: GA-A14, user request on 2026-10-26 Asia/Shanghai
- Related Forge guidance: GA-A13 and the implementation skill's readable-formatting convention

## Changes

- Added `.agents/skills/coding-format-review/SKILL.md` with focused checks for
  readable behavior-bearing code, multiline structures, named helpers, and
  avoidance of compressed control flow.
- Updated the code-review skill and Argus agent instructions to load the skill
  when coding format is in scope and report readability separately from behavior
  findings.

## Compatibility and validation

This is a read-only workflow capability. It does not alter application behavior,
approval gates, role names, or Git permissions. The skill references resolve to
checked-in files and preserve the existing independent-review boundary.

- Workflow files inspected with `Get-Content` — PASS
- `git diff --check` — PASS
- Application typecheck/lint/unit checks remain the existing evidence for the
  current Google Analytics candidate.

## Next stage

Argus should use the new focused skill during the next confirming review. Commit,
push, PR, merge, release, and deployment remain separately gated.
