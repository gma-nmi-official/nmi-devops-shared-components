# Delivery units and work breakdown: Public Storybook documentation

| Unit | Work item | Requirements / acceptance criteria | Repository | Dependencies | Owner | Definition of done | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SB-01 | Documentation shell and identity | R-002, R-003, R-006, R-007, R-011 / AC-002, AC-003, AC-006, AC-007, AC-011 | Current repository | Requirements and development approval | Forge | Storybook has approved theme, metadata, ordered navigation, welcome and guide pages. | Planned |
| SB-02 | Complete component, release, package docs, and landing content | R-004, R-005, R-013, R-014, R-015, R-016 / AC-004, AC-005, AC-013, AC-014, AC-015, AC-016, NFR-009 | Current repository | SB-01; reviewed Portal Header candidate | Forge | All public component exports have curated docs/states, Releases covers the changelog, `/catalog` is a clear package guide, `/` is a simple landing page, completeness validation exists, and contributor guidance is aligned. | Planned |
| SB-03 | Public-output safeguards | R-008 / AC-008 | Current repository | SB-01, SB-02 | Forge | A repeatable check audits only the generated public artifact for prohibited content and external/private runtime dependencies. | Planned |
| SB-04 | Application-only documentation route | R-001, R-009, R-010, R-012 / AC-001, AC-009, AC-010, AC-012 | Current repository | SB-01-SB-03 | Forge | Development and production builds generate ignored Storybook output under `public/docs`, `/docs` resolves through the application, standalone port-6006 access is removed, and Storybook failure fails the production build. | Planned |
| SB-05 | Verification and delivery handoff | All | Current repository | SB-01-SB-04 | Vera, Argus, Orion, human owner | Automated checks, standalone manual QA, public-content review, production-route evidence, independent review, and approved Git delivery are complete. Deployment remains separately gated if requested. | Planned |

## Delivery order and integration

SB-01 establishes the documentation structure. SB-02 fills the component journey. SB-03 verifies the documentation exposure boundary. SB-04 integrates Storybook with the existing application build and route. SB-05 covers validation, independent review, and delivery. Units can share one PR but retain distinct verification evidence.

This project uses full inception documents because it creates a public exposure boundary. Construction and validation may use compact per-unit reports if development approval accepts that depth. Commit, push, PR, merge, and deployment retain separate gates.
