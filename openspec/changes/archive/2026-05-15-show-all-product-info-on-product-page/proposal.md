## Why

The product page currently shows only a subset of available product fields, so users miss important details before deciding to buy. Showing all available product information improves transparency and supports informed purchase decisions.

## What Changes

- Expand product detail page to display all relevant product attributes available in the product model.
- Add structured sections for nutrition values, origin, ingredients, and multilingual descriptions where present.
- Add graceful fallbacks for missing fields so the page remains readable and consistent.
- Add i18next labels for newly exposed product attribute fields.

## Capabilities

### New Capabilities
- `complete-product-information-display`: Product detail page rendering of all available product metadata with localized labels and missing-data handling.

### Modified Capabilities
- `product-detail-navigation-and-layout`: Product detail page requirements expand from core info to full product attribute visibility.

## Impact

- Affected areas: product detail UI layout, product info mapping helpers, localization dictionaries, and product detail tests.
- Data impact: no API changes; uses already available product fields.
- Dependencies: existing `Product` type, i18next resources, and Jest product detail test coverage.
