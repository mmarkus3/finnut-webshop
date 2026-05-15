## 1. Search Modal Foundation

- [x] 1.1 Add header search trigger wiring to open/close a dedicated `SearchModal` component.
- [x] 1.2 Implement the small modal layout with accessible search input, focus behavior, and consistent modal/button styling.
- [x] 1.3 Add localized i18next keys for search modal title/placeholder/actions and empty/loading states.

## 2. Modal Search Behavior

- [x] 2.1 Implement modal query state handling with debounced product search/filter execution.
- [x] 2.2 Render bounded matching product preview results inside the modal using existing product item/card primitives.
- [x] 2.3 Implement localized no-results handling for non-empty queries with zero matches.

## 3. Dedicated Search Results Page

- [x] 3.1 Create a separate search results route/page that accepts and applies the active query.
- [x] 3.2 Render full matching product results on the page using existing list/grid components and established responsive behavior.
- [x] 3.3 Add localized empty-state content for zero matches on the full results page.

## 4. Navigation and Query Continuity

- [x] 4.1 Add submit and/or "view all results" actions in the modal to navigate to the dedicated search page.
- [x] 4.2 Ensure query continuity between modal and results page via route params or shared query helper logic.
- [x] 4.3 Verify back-navigation keeps expected UX flow between header, modal entry, and results page.

## 5. Verification

- [x] 5.1 Add/extend Jest tests for header button -> modal open behavior and modal search result rendering.
- [x] 5.2 Add/extend Jest tests for modal-to-results navigation and query propagation.
- [x] 5.3 Add/extend Jest tests for localized empty states in both modal and dedicated results page.
