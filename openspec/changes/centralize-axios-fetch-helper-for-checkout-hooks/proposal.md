## Why

Axios client creation and request wiring are duplicated across delivery points, delivery pricing, and payment methods hooks. This duplication makes networking behavior harder to maintain consistently and increases risk when request setup needs changes.

## What Changes

- Create a common fetch helper module that contains all direct axios imports/usage.
- Refactor delivery points, delivery pricing, and payment methods hooks to use the shared helper instead of importing axios directly.
- Keep existing hook behavior and response normalization semantics unchanged.
- Update tests as needed to validate refactored request paths and compatibility.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `checkout-delivery-point-selection`: Adjust implementation to use shared request helper for delivery-point fetch while preserving behavior.
- `delivery-pricing-fetch-and-threshold-messaging`: Adjust implementation to use shared request helper for pricing fetch while preserving behavior.
- `checkout-payment-method-selection`: Adjust implementation to use shared request helper for payment-method fetch while preserving behavior.

## Impact

- Affected code: networking logic in `hooks/deliveryPoints.ts`, `hooks/deliveryPricing.tsx`, `hooks/paymentMethods.ts`, plus new shared helper module.
- Affected dependencies: axios import centralization to helper module only.
- Affected tests: hook tests and any fetch-mocking patterns relying on direct axios usage.
