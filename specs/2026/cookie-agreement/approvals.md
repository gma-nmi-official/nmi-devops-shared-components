# Approval log: Cookie Agreement

| ID | Gate/action | Artifact/target | User decision | Actor | Timestamp/timezone | Conditions | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CA-A01 | Planning/scope | Independent Cookie Agreement plan at base `c580e408` | "For portal header and cookie aggreement component should separate" | User | 2026-10-12, time unavailable, Asia/Shanghai | Separate from Portal Header; planning only | Approved |
| CA-A02 | Scope exclusion | Remove GA and generic analytics integration from Cookie Agreement | "For portal header, please ignore GA. GA will be separately component also in cookie aggreement" | User | 2026-10-12, time unavailable, Asia/Shanghai | Cookie Agreement owns consent state only; GA becomes a separate future component/specification; no implementation authorized | Approved |
| CA-A03 | Component boundary | Cookie Agreement is standalone and separate from Portal Header | "cookie agreement should stand alone separate in portal header." | User | 2026-10-12, time unavailable, Asia/Shanghai | No Portal Header import, prop, rendering, styling, lifecycle, or runtime-state dependency; no implementation authorized | Approved |
| CA-A04 | Asset location | Store every Cookie Agreement logo, icon, font, seal, and artwork file in this repository | "Still in repo all assets" | User | 2026-10-12, time unavailable, Asia/Shanghai | No remote runtime visual assets; sources and redistribution rights must be recorded before release; no implementation authorized | Approved |

Privacy/legal, requirements, development, review adjustments, Git delivery, release, and deployment are not approved.
