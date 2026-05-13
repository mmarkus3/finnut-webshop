## 1. Category Title and Data Resolution

- [x] 1.1 Resolve selected category from route param and loaded categories, then render category page title as the category name.
- [x] 1.2 Add a safe fallback title behavior when the category identifier does not map to a known category.
- [x] 1.3 Ensure products are filtered using the selected category identifier and that all matching items are included.

## 2. Responsive Product Grid Layout

- [x] 2.1 Implement a product grid container on the category page that supports responsive column count rules.
- [x] 2.2 Configure desktop layout to render 4 product cards per row and mobile layout to render 1 product card per row.
- [x] 2.3 Validate grid spacing and card sizing so rows remain readable across viewport sizes.

## 3. Product Card Content and Validation

- [x] 3.1 Render product card fields: name, price, availability (`amount`), and description on each category product item.
- [x] 3.2 Limit description preview to a maximum of three lines using cross-platform text truncation behavior.
- [x] 3.3 Add or update Jest/component tests for title mapping, category filtering correctness, responsive grid column rules, and required product card fields.
