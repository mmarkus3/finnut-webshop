## 1. Home Category Row Component

- [ ] 1.1 Identify the home page top section render point and add a `HomeCategoryLinksRow` component placeholder in that location.
- [ ] 1.2 Implement `HomeCategoryLinksRow` to read available categories from the existing category data source used by listing/navigation flows.
- [ ] 1.3 Render category items as interactive links/buttons in a horizontal row with spacing and touch targets that work across mobile and desktop widths.

## 2. Navigation and Behavior

- [ ] 2.1 Map each category row item to the existing category listing route parameters (slug/id) used by the app.
- [ ] 2.2 Implement click/tap activation so selecting a category navigates to the matching category listing page.
- [ ] 2.3 Add overflow behavior for long category sets (horizontal scrolling or equivalent) so all categories remain reachable.

## 3. Localization, Accessibility, and Validation

- [ ] 3.1 Ensure category labels use localized display values and any additional hard-coded UI text goes through i18next.
- [ ] 3.2 Add accessibility attributes and keyboard-focus behavior so links are screen-reader and keyboard navigable.
- [ ] 3.3 Add or update Jest/component tests to cover row rendering, category-to-route mapping correctness, and accessible interaction behavior.
