## Why

Users can already choose a delivery method/point, but the selected option must be persisted into backend order data to keep fulfillment information accurate. Without saving the selected delivery method id, order processing may miss delivery instructions.

## What Changes

- Update active order after delivery method selection in checkout.
- Persist selected delivery method identifier to backend order payload.
- Ensure update targets current active order id and handles failure safely.
- Keep checkout selection UX while adding backend synchronization.

## Capabilities

### New Capabilities
- `checkout-delivery-method-persistence`: Persists selected delivery method id from checkout to backend order.

### Modified Capabilities
- `checkout-delivery-point-selection`: Selection action now triggers backend order update with selected delivery method id.
- `shopping-cart-management`: Active order lifecycle includes delivery-method persistence stage.

## Impact

- Affected code: checkout delivery selection handler, order update helper/service path, related tests.
- Backend data: `deliveryMethod` field on order updated with selected method id.
- Testing: add tests for successful update, payload shape, and failure behavior.
