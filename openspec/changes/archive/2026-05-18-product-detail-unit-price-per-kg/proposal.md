## Why

Customers need comparable pricing information directly on product detail pages. Showing unit price per kilogram improves transparency and helps users compare products regardless of package size.

## What Changes

- Add unit price per kg display on product detail page.
- Compute and render unit price only when required product data is available.
- Keep formatting localized and aligned with existing price presentation.
- Add fallback behavior when unit price cannot be computed.
- Add/update tests for unit-price calculation and rendering behavior.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `product-detail-navigation-and-layout`: Extend product detail pricing requirements to include localized unit price per kilogram display.

## Impact

- Affected UI: product detail price block.
- Affected logic: unit-price computation helper/formatting path.
- Affected tests: product detail helper tests and/or rendering assertions.
