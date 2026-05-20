## Why

Users need to apply campaign discount codes during cart/checkout and immediately see how totals change. The order payload also must persist the selected discount code so backend order creation and updates stay consistent.

## What Changes

- Add discount code input and apply flow in cart/checkout process.
- Fetch campaign by code from backend and derive discounted prices from campaign discount values.
- Support percentage discounts by calculating discounted price from original product price.
- Show both original price and discounted price in cart/checkout summaries and product rows where applicable.
- Store active discount code to `order.discount` and include it when creating/updating orders.

## Capabilities

### New Capabilities
- `checkout-discount-code-application`: Apply campaign code in cart/checkout, compute discount effects, and persist discount on order payload.

### Modified Capabilities
- `shopping-cart-management`: Cart price presentation and totals behavior are extended to support discount code adjusted prices.
- `checkout-order-lifecycle`: Order create/update payload requirements are extended to include persisted `order.discount`.

## Impact

- Affected areas include cart/checkout UI, pricing/totals calculation helpers, campaign lookup hook integration, and order create/update logic.
- Existing tests around cart totals and checkout submission need updates for discount scenarios.
- No backend API contract change beyond consuming existing campaign endpoint and sending `order.discount`.
