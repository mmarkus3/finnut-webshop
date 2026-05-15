## 1. Home Section Header Action

- [x] 1.1 Update home category section header layout to include a section-level "Show all" action.
- [x] 1.2 Wire the "Show all" action to navigate to `/category/[categoryId]` using the section category id.
- [x] 1.3 Ensure the action is rendered only for valid category sections with products.

## 2. Localization And Accessibility

- [x] 2.1 Add i18next keys for show-all button text in supported locales.
- [x] 2.2 Add localized accessibility label for the show-all action including category context.
- [x] 2.3 Replace any hard-coded show-all copy with localized keys.

## 3. Verification

- [x] 3.1 Extend home category section tests to assert show-all action renders per section.
- [x] 3.2 Add/extend tests to assert show-all action navigates with correct `categoryId` route param.
- [x] 3.3 Add/extend tests to verify localized text/accessibility label usage for show-all action.
