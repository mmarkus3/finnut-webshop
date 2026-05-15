## Why

Availability quantity is currently shown as plain text, which makes stock urgency hard to scan quickly. Color-coded stock status labels improve clarity and help users make faster purchase decisions.

## What Changes

- Add availability status labels with fixed thresholds and colors:
  - red: `Loppu varastosta` when amount is `0`
  - yellow: `Loppuu pian` when amount is less than `10` and greater than `0`
  - green: `Varastossa` when amount is `10` or more
- Apply the status labels consistently where product availability is displayed (product cards, category grid, and product detail page).
- Add i18next keys for the new stock status labels and any accessibility text required.

## Capabilities

### New Capabilities
- `availability-status-indicators`: Threshold-based availability labels with semantic color states for product availability.

### Modified Capabilities
- `homepage-category-product-sections`: Product card availability presentation is upgraded from raw quantity text to threshold-based stock status indicators.
- `category-page-product-grid`: Category product card availability presentation is upgraded from raw quantity text to threshold-based stock status indicators.
- `product-detail-navigation-and-layout`: Product detail availability presentation is upgraded from raw quantity text to threshold-based stock status indicators.

## Impact

- Affected areas: shared product availability rendering logic, home/category/product UI components, localization resources, and Jest tests.
- Data/API impact: none; uses existing `amount` field.
- Dependencies: current product card and product detail components, i18next dictionary files, and component test suites.
