## Why

Campaign discounts now may include `discountFixed` at product level, but cart/checkout currently focuses on percentage-based campaign discounts. Users should see correct discounted prices when fixed-price campaign discounts are defined.

## What Changes

- Extend campaign discount interpretation to support product-level `discountFixed` values.
- In cart/checkout, display discounted price when product has active campaign `discountFixed`.
- Keep original price visible alongside discounted price for transparency.
- Apply fixed-discount pricing to line totals and summary totals where relevant.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `checkout-discount-code-application`: Discount application logic is expanded to support product-level fixed-price discounts in addition to percentage discounts.
- `shopping-cart-management`: Cart and checkout price rendering/totals are expanded to reflect product-level fixed discount values.

## Impact

- Affected code includes campaign typing, discount calculation helpers, and cart/checkout summary rendering.
- Tests for mixed discount modes (percentage/fixed/no-discount) need updates.
- No backend API endpoint changes required.
