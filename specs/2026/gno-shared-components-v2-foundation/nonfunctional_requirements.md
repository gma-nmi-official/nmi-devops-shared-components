# Nonfunctional requirements: gno-shared-components-v2 foundation

| ID | Area | Measurable requirement / target | Source / rationale | Validation method | Owner | Approval |
| --- | --- | --- | --- | --- | --- | --- |
| NFR-001 | Accessibility | Reference component has no automated serious/critical axe violations and supports keyboard operation, visible focus, and accessible naming; target WCAG 2.2 AA behavior where applicable. | Shared UI multiplies accessibility impact | Storybook a11y, interaction tests, manual keyboard check | Vera | Pending |
| NFR-002 | Compatibility | Build and showcase pass on the declared Node engine and the repository's Next 16.3.8/React 19.2.8 baseline. Broader ranges must not be claimed without matrix evidence. | Verified repository baseline | CI/build matrix | Vera | Pending |
| NFR-003 | Reliability | A clean install followed by all required checks is reproducible from the committed lockfile. | Consumer/release confidence | Clean-install CI | Vera | Pending |
| NFR-004 | Package integrity | Packed contents contain only runtime artifacts, declarations, license/readme metadata, and documented exports; no app or test source is shipped unintentionally. | Supply-chain and package-size control | Pack dry run/content assertion | Vera | Pending |
| NFR-005 | Performance | Every public module is tree-shakeable and noninteractive imports do not create a client boundary. No numeric bundle budget is set until the first GNO component baseline is measured. | Avoid premature invented target | Bundle/output inspection and recorded baseline | Vera | Pending |
| NFR-006 | Security | No runtime secret, network call, install script, or unsafe HTML behavior is introduced by the foundation/reference component. | Library trust boundary | Manifest/source review and tests | Argus | Pending |
| NFR-007 | Maintainability | Each public component has typed API documentation, stories, tests, and an explicit export; internal paths are not public API. | Sustainable shared ownership | Review checklist | Argus | Pending |

## Constraints and accepted tradeoffs

- Automated accessibility testing catches only a subset of issues, so manual keyboard verification remains required.
- A single supported framework baseline is validated initially; expanding the compatibility claim requires additional matrix evidence.
- Tokens remain co-located with UI until a separate package has a demonstrated consumer, avoiding premature package fragmentation.

## Requirement-to-design and test links

See `design.md`, `acceptance_criteria.md`, and `test_plan.md`.
