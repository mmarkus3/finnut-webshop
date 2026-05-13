## 1. Home Sections and Data Grouping

- [x] 1.1 Add a dedicated `HomeCategoryProductSections` component and render it on the home page where category content is shown.
- [x] 1.2 Implement category-product grouping logic so products are assigned to sections by matching category identifier.
- [x] 1.3 Ensure sections render in stable category order and skip or handle empty category-product results consistently.

## 2. Category Carousels and Product Cards

- [x] 2.1 Render each category section with its category name heading followed by a horizontal product carousel.
- [x] 2.2 Build product cards to display the first product image when `images` contains one or more URLs.
- [x] 2.3 Add placeholder image fallback for products with no images or unusable image data.

## 3. Accessibility, Localization, and Tests

- [x] 3.1 Localize any new section headings/labels with i18next and keep category title display locale-aware.
- [x] 3.2 Add accessibility roles/labels and focus behavior for carousel items and product cards.
- [x] 3.3 Add or update Jest/component tests for grouping accuracy, carousel rendering per category, first-image selection, and placeholder fallback.
