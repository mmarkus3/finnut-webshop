## Why

Product information is currently inconsistent between home page product cards and category page product cards, which makes browsing feel uneven. Also, category page cards should visually represent products with an image and reliable fallback when images are missing.

## What Changes

- Align home page product card fields with category page product card fields.
- Ensure home page product cards show the same product metadata set as category page cards (name, price, availability, and description preview behavior).
- Add product image rendering to category page product cards.
- Add fallback image behavior on category page when product image is missing or invalid.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `homepage-category-product-sections`: Update product card requirements so home cards match category page product info contract.
- `category-page-product-grid`: Update product card requirements to include primary product image with fallback image behavior.

## Impact

- Affected UI: home and category product card components.
- Affected behavior: product card field parity between pages and category-page image rendering.
- Affected design consistency: shared product-card content and fallback rules.
- Testing: add/adjust tests for parity of fields and image/fallback behavior on category page cards.
