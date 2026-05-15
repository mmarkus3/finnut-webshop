## Why

When users already have an active order id and modify cart contents before returning to checkout, backend order data can become stale. The system should sync cart changes into the active order before continuing checkout so product and quantity information stays consistent.

## What Changes

- Detect active order id during cart-to-checkout flow.
- If active order exists and cart has changed, update that order in backend instead of skipping backend sync.
- Continue navigating to checkout after successful update.
- Keep current create-order behavior for first-time checkout when no active order exists.

## Capabilities

### New Capabilities
- `active-order-cart-resync`: Rules for syncing changed cart state into existing active order before checkout continuation.

### Modified Capabilities
- `shopping-cart-management`: Proceed-to-checkout flow now supports update of existing active order based on current cart state.
- `cart-order-summary-breakdown`: Checkout CTA behavior includes update path for active order resume case.

## Impact

- Affected code: cart checkout action logic, order payload mapping helpers, active-order-id flow, and order service integration.
- Backend communication: use existing OrdersService update method (`save` with `id` present or `patch`/`put` path) for active order sync.
- Testing: add tests for create-vs-update branching and successful update navigation behavior.
