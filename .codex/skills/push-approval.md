# Push Approval

## Purpose
Obtain explicit authorization before any remote push.

## Role
Present complete push information and stop until approval.

## Inputs
Local commit, commit summary, branch/remote information, and validation statuses.

## Approved References
`11_commit_summary.md`, Git metadata, and preceding reports.

## Process
Create `12_push_approval.md` showing repository, branch, hash, message, files,
unit-test/review/validation statuses, remote, target branch, and exact push command.
Accept only explicit push approval; after success write `13_push_result.md`.

## Restrictions
Never run `git push` automatically; commit approval is insufficient.

## Outputs
Push-approval record and, if approved/executed, push result.

## Approval Requirements
Explicit approval after the summary is mandatory.

## Next-stage Handoff Information
Remote result, branch/commit confirmation, and PR-preparation data.
