## Why

Users who start checkout can lose continuity if they leave to browse more products and return later. Persisting the active backend order id locally allows them to resume the same order instead of creating duplicates.

## What Changes

- Save created backend order id to local storage after successful cart-to-checkout order creation.
- Reuse stored active order id when user returns to checkout flow.
- Add fallback behavior when stored order id is missing/invalid.
- Keep cart browsing flow uninterrupted while preserving resume capability.

## Capabilities

### New Capabilities
- `active-order-local-resume`: Local persistence and retrieval rules for active backend order id.

### Modified Capabilities
- `checkout-customer-information-page`: Checkout entry behavior supports resume with previously created order id.
- `shopping-cart-management`: Cart-to-checkout transition persists/reuses active order id.

## Impact

- Affected code: cart checkout action flow, checkout state handling, local storage helpers.
- Testing: add tests for save/load/clear order id and resume behavior.
- No backend API changes required.
