## Why

Product cards in list/grid views can crop images in a way that hides important visual details. Showing the complete product image improves recognition, trust, and browse efficiency.

## What Changes

- Update list/grid product image rendering to show the full image without cutting critical content.
- Preserve consistent card layout while adapting image fit behavior.
- Keep fallback image behavior unchanged when no image exists.
- Add/extend tests for full-image rendering behavior in list/grid cards.

## Capabilities

### New Capabilities
- `full-product-image-visibility-in-cards`: Product cards in list/grid surfaces render complete product images.

### Modified Capabilities
- `homepage-category-product-sections`: Home product card image presentation is updated to show complete images.
- `category-page-product-grid`: Category grid card image presentation is updated to show complete images.

## Impact

- Affected areas: home card and category grid card image classes/fit settings, with possible minor card height tuning.
- Data/API impact: none.
- Dependencies: shared image fallback behavior and Jest tests for card rendering.
