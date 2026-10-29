# Code-review adjustment PR reply

Use this template after the correction is committed, validated, and confirmed
by Argus. The execution record filename must include the PR number:
`<sequence>_pr<PR-number>_<scope>_code_review_adjustment_<YYYY-MM-DD>.md`.

```markdown
### Code-review adjustment: CR-<number>

**PR:** #<pr-number>

**Disposition:** REQUIRED / OPTIONAL / NOT APPLICABLE / DEFERRED

**Status:** OPEN / IN PROGRESS / RESOLVED / BLOCKED / NOT APPLICABLE / DEFERRED

#### Finding

<Reviewer’s concern.>

#### Assessment

<Why the finding is valid, invalid, optional, or deferred.>

#### Correction

<What was changed, or why no change was made.>

#### Files changed

- `<path>`

#### Validation

- `<command or check>` — PASS
- `<regression test>` — PASS
- `<blocked or N/A check>` — rationale

#### Adjustment record

[`<sequence>_pr<PR-number>_<scope>_code_review_adjustment_<YYYY-MM-DD>.md`](<relative-path>)

#### Commit

`<commit-hash>` or `Not committed`
```

`Status` describes the adjustment itself, not the next workflow handoff.
