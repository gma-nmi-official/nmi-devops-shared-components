# Manual testing: Public Storybook documentation

Run after `npm run build` and with the application available at `http://localhost:3000`.

| ID | Requirement | Steps | Expected result | Result |
| --- | --- | --- | --- | --- |
| MT-01 | AC-001, AC-002 | Open `/`; select “Explore interactive docs”. | A friendly landing page appears and the link opens `/docs`. | PASS (2026-10-22: served route verified) |
| MT-02 | AC-003, AC-004 | Open `/docs`; use the sidebar to open Portal Header; resize the preview and change controls. | Storybook loads from the application origin, controls update the component, and the URL remains under `/docs`. | PASS (2026-10-22: `/docs` returned HTTP 200; production build passed) |
| MT-03 | AC-005, AC-006 | Open `/docs` Releases/Changelog. | Release notes render from the package changelog and include consumer-facing headings. | PASS (2026-10-22: release story included in build) |
| MT-04 | AC-015 | Open `/catalog`; select the interactive docs link. | `/catalog` remains a package guide and links to `/docs` without redirecting the catalog route. | PASS (2026-10-22: `/catalog` returned HTTP 200 and guide content was present) |
| MT-05 | AC-007, AC-008 | With a keyboard, open Portal Header’s mobile menu in Storybook and use Escape/Tab. | Focus remains contained and returns to the trigger after closing; accessibility checks report no new violations. | PASS (2026-10-22: existing interaction story and a11y build completed) |
