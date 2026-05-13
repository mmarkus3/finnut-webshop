## Why

The category page currently does not provide the requested product browsing experience and key product details in a structured layout. Users need a clear category heading and a scannable product grid to quickly evaluate items by name, price, availability, and description.

## What Changes

- Update the category page title to display the selected category's actual name.
- Render all products belonging to the selected category in a responsive grid layout.
- Use responsive column behavior: 4 products per row on desktop, 1 product per row on mobile.
- Show product name, price, availability (`amount`), and description preview (max three lines) in each product card.

## Capabilities

### New Capabilities
- `category-page-product-grid`: Category pages display category-named headers and responsive product grids with required product metadata.

### Modified Capabilities
- None.

## Impact

- Affected UI: category page header and product-listing presentation.
- Affected data mapping: category-route-to-category-name resolution and filtered product selection by category.
- Affected UX: desktop/mobile responsive behavior and product information visibility.
- Testing: add coverage for title resolution, filtering correctness, responsive grid rules, and card field rendering constraints.
