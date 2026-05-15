## Why

Cart items currently do not show product images, making visual confirmation harder before checkout. The cart summary also lacks VAT visibility, so users cannot see tax amount breakdown from product tax rates.

## What Changes

- Show each cart line item image on cart page using product image, with fallback placeholder when missing.
- Extend cart summary to show total price and VAT amount.
- Calculate VAT from `product.tax` as a decimal percentage (for example `0.255` = 25.5%).
- Add/extend tests for image fallback and VAT calculation behavior.

## Capabilities

### New Capabilities
- `cart-image-and-vat-breakdown`: Cart line items show product image/fallback and cart summary includes VAT amount derived from per-product tax values.
- `shopping-cart-management`: Cart summary behavior includes VAT breakdown and visual line-item image context.

### Modified Capabilities
- None.

## Impact

- Affected areas: cart page line item UI, cart total calculation helpers/selectors, and translation keys.
- Data/API impact: uses existing product fields and adds `tax` handling in cart calculations.
- Dependencies: product image helper/fallback logic, cart reducer/selectors, and Jest cart/cart-page tests.
