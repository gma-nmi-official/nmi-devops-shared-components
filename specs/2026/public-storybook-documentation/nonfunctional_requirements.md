# Nonfunctional requirements: Public Storybook documentation

| ID | Area | Measurable requirement / target | Source / rationale | Validation method | Owner | Approval |
| --- | --- | --- | --- | --- | --- | --- |
| NFR-001 | Security | Built output contains no secret values, credential-like examples, local absolute paths, internal execution records, or runtime calls to private services. | Public exposure boundary | Static scan plus independent review | Forge/Argus | Approved SB-A01 |
| NFR-002 | Deployment simplicity | Storybook adds no second hosting account, deployment token, hostname, or runtime service; it ships with the existing application artifact. | User clarification | Build/configuration inspection | Forge/Argus | Approved SB-A01 |
| NFR-003 | Accessibility | Landing, guides, and representative component docs/stories have keyboard-visible focus and no serious/critical automated accessibility violations in the tested environment. | Friendly public documentation | Storybook a11y/axe and manual keyboard checks | Vera/human QA | Approved SB-A01 |
| NFR-004 | Compatibility | Static output loads in current stable Chromium, Firefox, and WebKit-class browsers without broken navigation or assets; unavailable native Safari evidence is recorded rather than inferred. | Public web reach | Automated/browser smoke tests and manual record | Vera/human QA | Approved SB-A01 |
| NFR-005 | Reliability | The combined production build fails when Storybook fails; successful output contains the Storybook entry point and required assets. | Operational safety | Build failure-path and artifact inspection | Vera | Approved SB-A01 |
| NFR-006 | Maintainability | Public narrative lives in dedicated MDX files, component behavior remains in colocated stories, and navigation order/theme are centralized in Storybook configuration. | Future component growth | Structure review | Argus | Approved SB-A01 |
| NFR-007 | Understandability | A human reviewer unfamiliar with implementation can complete the documented first-render path and locate accessibility/limitations guidance without assistance. | User request | Manual usability case | Human QA | Approved SB-A01 |
| NFR-008 | Performance | No numeric performance budget is set for the first release; the static build must have no missing assets or unexpected external runtime dependencies. Capture baseline transfer/build observations for later target setting. | Avoid invented target; small initial catalog | Build inspection and network smoke check | Vera | Approved SB-A01 |
| NFR-009 | Completeness | Every public component export and every changelog release heading is represented in Storybook; missing coverage fails validation. | User clarification and repository policy | Automated coverage check plus review | Vera/Argus | Approved SB-A01 |

## Constraints and accepted tradeoffs

- Storybook is a client-rendered documentation shell; search-engine rendering and bespoke marketing-site performance are not first-release goals.
- Same-origin static delivery does not add Storybook-specific visual history or branch previews.
- Documentation visibility follows the deployed application's access policy. Package and repository access remain governed by their existing contracts.

## Requirement-to-design and test links

Security and publication requirements map to D-001/D-004 and AC-001/AC-008/AC-010. Accessibility and usability map to D-002/D-003 and AC-002/AC-004/AC-006/AC-007. Completeness maps to D-007 and AC-004/AC-014.
