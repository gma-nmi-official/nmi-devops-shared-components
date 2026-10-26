---
name: "coding-format-review"
description: "Review implementation readability and coding format against repository conventions without changing source."
---

# Coding-format review

Use this focused review alongside implementation or code review when readable
code is part of the acceptance expectation. Inspect only the scoped diff and
nearby code needed for context; do not reformat unrelated files.

Check that behavior-bearing code is understandable at a glance:

- Keep one operation or decision per line when practical.
- Expand multiline conditionals, object literals, and function calls when they
  carry behavior or important data flow.
- Use named helpers for non-trivial branches and repeated transformations.
- Avoid compressed semicolon blocks, nested one-line control flow, and dense
  destructuring that hides side effects.
- Preserve the repository formatter, linter, naming, and import conventions.
- Distinguish readability findings from behavior defects; do not request broad
  stylistic modernization or unrelated churn.

Record file/line evidence, impact, and a focused correction for each finding.
Classify required readability problems as Minor or higher only when they make
behavior, error handling, or review materially difficult to understand.
