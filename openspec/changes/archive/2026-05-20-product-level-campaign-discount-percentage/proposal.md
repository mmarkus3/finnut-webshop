## Why

Current discount logic assumes a campaign-level `discountPercentage`, but backend campaign data defines discount percentage at product level. This mismatch can produce incorrect prices and bypass the campaign type contract.

## What Changes

- Refactor discount calculation to read `discountPercentage` from campaign product-level entries.
- Use campaign interface types directly for resolving per-product discount values.
- Apply discount only to products explicitly present in campaign discount configuration.
- Keep original and discounted price display behavior unchanged, but based on product-level discount mapping.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `checkout-discount-code-application`: Discount calculation requirements are updated from campaign-level percentage to product-level percentage lookup using campaign types.
- `shopping-cart-management`: Cart/checkout discount totals behavior is updated to apply discounts only to products included in campaign product-level discount data.

## Impact

- Affected code includes campaign type definitions, checkout discount hook mapping, and discount pricing helpers.
- Tests for discount math and cart/checkout totals need updates for mixed carts (discounted + non-discounted items).
- No endpoint changes; this is a frontend data interpretation correction.
