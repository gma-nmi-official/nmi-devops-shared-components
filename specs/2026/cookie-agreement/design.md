# Solution design: Cookie Agreement

## Interface and behavior

Proposed `packages/ui/src/components/cookie-agreement/` owns the component, consent types, optional store adapter, repository-local assets, tests, story, and styles. It has its own public export and CSS and is independently imported, rendered, configured, tested, and released. It does not import, wrap, render, configure, or share runtime state with Portal Header.

Controlled inputs include current record/status, policy version, approved categories, copy/actions/privacy URL, optional seal content, functional decision callbacks, and a storage-error callback.

Proposed record fields are `policyVersion`, `status` (`accepted`, `rejected`, or `customized` as approved), category decisions, `decidedAt`, and optional `expiresAt`. `ConsentStore` exposes `read`, `write`, and `clear`; cookie attributes and retention are adapter configuration, not presentation constants.

Unknown/malformed/expired/version-mismatched storage returns the approved safe state, proposed as requiring an explicit decision. Display timing is separate from consent. Cookie Agreement performs no analytics work; a separate future GA component may observe the approved consent record through the consumer application.

## Decisions

| ID | Requirement | Proposed decision | Alternative | Rationale | Approval |
| --- | --- | --- | --- | --- | --- |
| CA-D01 | CA-R01 | Independent `CookieAgreement` export and public consent types | Coupled portal shell | Independent adoption/release | Pending |
| CA-D02 | CA-R02-CA-R07 | Controlled UI plus optional store/event adapters | Hard-coded `_ckn` cookie | Explicit policy ownership/testability | Pending |
| CA-D03 | CA-R03, CA-R04 | Versioned explicit decisions | Boolean acknowledgment only | Supports expiry/policy evolution | Pending |
| CA-D04 | CA-R08, CA-R09 | Narrow client module with deterministic initial state | Package-wide client/global storage | SSR predictability | Pending |
| CA-D05 | CA-R06, CA-R10 | Local implementation with all approved assets stored and versioned in this repository | Load remote or legacy notice/assets | Security, reproducibility, and rights boundary | Pending |
| CA-D06 | CA-R11 | Complete vertical unit with tests/story/catalog/docs | Documentation later | Required repository policy | Pending |

## Migration/recovery

Privacy owner decides whether legacy `_ckn=1` is migrated, treated as expired, or retained for a transition. Existing production notice remains until separately approved consumer migration. Rollback removes integration or reverts the package release; record compatibility must prevent accidental consent loss or false consent.

## Approval

See `wbs.md`. Privacy/legal, requirements, and development approvals are pending.
