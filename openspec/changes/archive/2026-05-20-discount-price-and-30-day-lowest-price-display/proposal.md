## Why

Backend now provides `discountPrice`, but the storefront does not yet present discounted pricing in a clear, compliant way. Customers need transparent discount communication, including the previous lowest price over the last 30 days.

## What Changes

- Add support for `discountPrice` in product UI pricing presentation.
- When `discountPrice` exists, show discounted price prominently in red.
- When `discountPrice` exists, show `retailPrice` as overlined (strikethrough).
- When `discountPrice` exists, show `lowestRetailPriceLast30Days` with label `Alin hinta edellisen 30 päivän aikana`.
- Keep current pricing behavior unchanged when `discountPrice` is missing.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `product-listing-and-pricing`: Price presentation requirements are extended for discounted products and 30-day lowest retail price disclosure.
- `product-detail-navigation-and-layout`: Product detail price block requirements are extended for discounted products and 30-day lowest retail price disclosure.

## Impact

- Affected code includes product price formatting and product card/detail rendering logic.
- Product type definitions likely need new optional fields (`discountPrice`, `lowestRetailPriceLast30Days`).
- Existing pricing tests require updates and new test cases for discount scenarios.
