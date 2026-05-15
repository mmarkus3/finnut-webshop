## Why

Users currently cannot search products directly from the header, which makes product discovery slow when they already know what they want. Adding a fast search entry point and a full results page improves findability and conversion for larger catalogs.

## What Changes

- Add a header search interaction that opens a small modal with a search input.
- Show matching product results inside the modal while the user types.
- Add a dedicated search results page that shows the full set of matching products.
- Add navigation from modal results (or submit action) to the dedicated search page.
- Add i18next translations for all new search UI labels, placeholders, and empty states.

## Capabilities

### New Capabilities
- `product-search-and-results-navigation`: Product search initiated from header modal, including inline preview results and full results page navigation.

### Modified Capabilities
- None.

## Impact

- Affected areas: header UI, modal UI, product search data flow, routing/navigation, search results page layout.
- Potential API/data impact: product listing/filter query usage for search keywords.
- Dependencies: existing product card/list UI components, i18next translation resources, Jest tests for modal and page behaviors.
