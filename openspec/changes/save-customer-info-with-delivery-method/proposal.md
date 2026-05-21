## Why

Checkout currently saves the selected delivery method to the active order separately, while customer information remains only in local checkout state at that moment. Saving customer information in the same order update keeps the backend order complete before the user progresses to payment and avoids a split persistence window.

## What Changes

- Include the current checkout customer information when persisting a selected delivery method to the active order.
- Keep the delivery method and customer data in the same backend patch/update request.
- Preserve existing validation: delivery selection is only actionable after required customer fields are present.
- Preserve existing recoverable delivery-method save error behavior.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `checkout-delivery-method-persistence`: Delivery method persistence SHALL save both `deliveryMethod` and `customer` to the active order in the same update.
- `checkout-customer-information-page`: Required customer information SHALL be the source of customer payload persisted with delivery method selection.

## Impact

- Affected code: `hooks/deliveryMethodPersistence.ts` and `components/checkout/CheckoutPage.tsx`.
- Affected tests: delivery method persistence helper tests and checkout delivery selection tests.
- APIs/dependencies: no endpoint or dependency changes expected; existing active order patch endpoint receives an expanded payload.
