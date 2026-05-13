## Context

The webshop home page currently does not expose category navigation as a first-class entry point near the top of the page. Users who want to browse by category must discover category access through deeper page sections or separate navigation routes. The requested change adds a direct category link row at the top of the home page to reduce time-to-category and improve browseability.

The implementation must align with the current TypeScript React/Expo codebase, reuse existing catalog/category data where available, and preserve accessibility and localization practices (i18next for UI strings).

## Goals / Non-Goals

**Goals:**
- Render a top-of-home horizontal category link row that is visible during normal page load.
- Ensure links are driven by existing category source data rather than hard-coded category values.
- Navigate users to the correct category listing route when a category is selected.
- Keep the component modular and testable, with coverage for rendering and navigation behavior.

**Non-Goals:**
- Redesigning the full home page layout beyond adding the category links section.
- Introducing new category management backend APIs.
- Changing category taxonomy or localization content strategy outside this surface.

## Decisions

1. Add a dedicated `HomeCategoryLinksRow` UI component in the home feature module.
Rationale: Encapsulates rendering, accessibility attributes, and item mapping logic in a single reusable surface that can be tested independently.
Alternative considered: Inline rendering inside the home page container. Rejected because it increases container complexity and makes focused tests harder.

2. Source links from the existing category feed/store used by category and listing pages.
Rationale: Prevents data drift and avoids manual duplication of category labels/slugs.
Alternative considered: Static config list on home page. Rejected because it can become inconsistent with catalog state.

3. Use existing app navigation route shape for category pages (`category identifier` -> listing view).
Rationale: Minimizes route-level changes and preserves deep-link compatibility.
Alternative considered: Add a new intermediate route just for home-row links. Rejected as unnecessary indirection.

4. Use horizontal scrolling behavior when categories exceed viewport width.
Rationale: Maintains readable link labels and touch targets on smaller screens without truncating categories.
Alternative considered: Multi-line wrapped grid. Rejected for inconsistent vertical rhythm at top of home and more complex responsive behavior.

## Risks / Trade-offs

- [Category dataset unavailable at render time] -> Mitigation: render empty/placeholder row state and hydrate when data resolves.
- [Long localized category labels overflow] -> Mitigation: use stable spacing/touch target styles with horizontal scroll, and validate with i18n strings.
- [Navigation target mismatch due to slug/id variance] -> Mitigation: map link payload from the same route params source already used by category listings and add navigation tests.
- [Top-of-page content crowding on small screens] -> Mitigation: keep compact link styling and verify with mobile viewport QA.
