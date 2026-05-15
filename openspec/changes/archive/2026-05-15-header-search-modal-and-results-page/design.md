## Context

The webshop currently supports browsing through homepage and category navigation but lacks direct search from the global header. Users who know an item name must manually navigate categories, which is slower on larger catalogs. The change spans header interaction, modal UI, product querying/filtering, and route navigation to a dedicated search page. Constraints include consistent modal/button styling, accessibility-friendly interactions, i18next localization for new text, and Jest test coverage.

## Goals / Non-Goals

**Goals:**
- Provide a fast header-level search entry point via a compact modal.
- Return and display lightweight preview results inside the modal while searching.
- Support transition to a full search results page for complete result browsing.
- Keep search UI modular, reusable, and aligned with existing design patterns.
- Ensure all user-facing copy is localized through i18next.

**Non-Goals:**
- Introducing a new backend search service or external search provider.
- Reworking product ranking/relevancy algorithms beyond current filtering capabilities.
- Adding advanced search filters (price range, brand, sorting controls) in this change.

## Decisions

1. Header search button opens a dedicated `SearchModal` component.
- Rationale: Encapsulates modal state and content, keeps header component simple, and supports future extensibility.
- Alternative considered: Inline expanding search box in header. Rejected because it increases header layout complexity and mobile responsiveness risk.

2. Modal shows bounded preview results with debounced query updates.
- Rationale: Reduces rendering churn and avoids overwhelming users in a compact surface while still giving immediate feedback.
- Alternative considered: Trigger only on explicit submit. Rejected because it removes the live-discovery experience requested for the modal.

3. Full results are shown on a dedicated search route/page using the same query state source.
- Rationale: Supports complete browsing and scalable layout while preserving modal as a quick-entry surface.
- Alternative considered: Expand modal to full-screen for all results. Rejected due to poorer route/shareability and weaker navigation semantics.

4. Reuse existing product list/card presentation primitives in both modal previews and full results page.
- Rationale: Preserves visual consistency, lowers implementation risk, and minimizes duplicated logic.
- Alternative considered: Build search-only cards. Rejected because it would duplicate existing product rendering behavior.

5. Localize placeholder, empty, loading, and action texts via i18next keys introduced for search UX.
- Rationale: Keeps internationalization consistent and prevents hard-coded strings.

## Risks / Trade-offs

- [Modal query and page query drift] -> Mitigation: Normalize query handling in shared helper/hook and pass query through route params on navigation.
- [Large result sets hurting page performance] -> Mitigation: Use existing paginated/virtualized listing patterns where available and cap modal preview count.
- [Accessibility regressions in modal focus handling] -> Mitigation: Use existing modal primitives and verify keyboard/screen reader label behavior with tests.
- [No-result confusion] -> Mitigation: Provide explicit localized empty-state text in both modal and page contexts.
