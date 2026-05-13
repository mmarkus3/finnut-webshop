## Why

The current home page does not let users quickly browse products grouped by category in one view. Showing categories with product carousels directly on the home page improves product discovery and makes category browsing faster without extra navigation.

## What Changes

- Render multiple category sections on the home page, each with a category title and horizontal product carousel.
- Group home page products under their matching category sections using existing category and product data.
- Display each product card using its first image when available.
- Display a placeholder image when a product has no images.
- Keep carousel and card behavior responsive and accessible across mobile and web.

## Capabilities

### New Capabilities
- `homepage-category-product-sections`: Home page displays categories with product carousels and fallback placeholder images.

### Modified Capabilities
- None.

## Impact

- Affected UI: home page structure and product presentation components.
- Affected data wiring: category-product grouping logic and image selection fallback behavior.
- Affected navigation/UX: faster browsing from home through visible category groupings.
- Testing: add coverage for grouping, carousel rendering, first-image selection, and placeholder fallback behavior.
