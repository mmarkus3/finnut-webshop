## Why

Customers need clear delivery pricing early in browsing and checkout to reduce uncertainty and cart abandonment. Fetching delivery pricing as early as possible and showing threshold messaging improves transparency.

## What Changes

- Fetch delivery pricing from `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/prices` as early as possible in app lifecycle.
- Store delivery pricing values:
  - `over`: free-delivery threshold amount
  - `delivery`: delivery price when cart amount is below threshold
- Show a global banner under header on all pages indicating free delivery over `over` amount.
- Show actual delivery cost in cart/checkout based on cart total:
  - if `cartTotal >= over` -> free delivery
  - if `cartTotal < over` -> show `delivery` price

## Capabilities

### New Capabilities
- `delivery-pricing-fetch-and-threshold-messaging`: Delivery pricing fetch, global threshold banner, and threshold-based delivery-cost display behavior.

### Modified Capabilities
- `cart-order-summary-breakdown`: Delivery row moves from static placeholder to threshold-based dynamic value from pricing API.
- `checkout-customer-information-page`: Checkout summary delivery cost reflects fetched threshold-based pricing.

## Impact

- Affected code: app layout/global header area, new delivery-pricing hook/service, cart and checkout summary rendering.
- API usage: GET `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/prices`.
- Testing: add tests for fetch behavior, threshold banner text, and cart/checkout delivery-cost branching.
