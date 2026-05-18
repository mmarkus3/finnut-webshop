## Why

Current add-to-cart flow adds one unit per action, which is slow when users want multiple pieces of the same product. Allowing quantity selection before adding improves usability and reduces repetitive taps.

## What Changes

- Add ability to select quantity greater than one before adding a product to cart.
- Extend cart add action to accept explicit quantity while respecting stock limits.
- Update product detail add-to-cart UI to support quantity selection.
- Keep existing increment/decrement/remove cart behavior intact.
- Add tests for reducer logic and product-detail quantity interactions.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `shopping-cart-management`: Extend add-to-cart behavior so a single add action can add multiple pieces.
- `product-detail-navigation-and-layout`: Extend product detail action area to support selecting quantity before adding to cart.

## Impact

- Affected logic: cart reducer/action payloads and add-item helpers.
- Affected UI: product detail page add-to-cart section.
- Affected tests: cart reducer tests and product-detail tests.
