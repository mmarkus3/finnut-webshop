## Why

Checkout currently stops after customer information and delivery-method selection. Users need to continue to the next checkout step to choose a payment method before completing the order flow.

## What Changes

- Add a navigation action from current checkout step to a new payment-method selection step, enabled only after customer information is filled and a delivery method is selected.
- Add a dedicated payment-method step page/view.
- Fetch payment methods from `${process.env.EXPO_PUBLIC_FIREBASE_API!}/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/paymentMethods`.
- Display payment methods on the left and the same order summary on the right (matching previous checkout step layout behavior).
- Add loading/error/empty states and tests for payment-method retrieval and step navigation.

## Capabilities

### New Capabilities
- `checkout-payment-method-selection`: Provide a dedicated checkout step for selecting payment methods fetched from company-scoped payment-methods endpoint.

### Modified Capabilities
- `checkout-customer-information-page`: Extend checkout flow to allow progression to payment-method step only after customer information and delivery-method selection are complete.

## Impact

- Affected UI: checkout step flow, new payment-method step screen/component, summary reuse.
- Affected data fetching: payment methods endpoint integration.
- Affected state: step completion gating and selected payment method.
- Affected tests: checkout flow progression and payment-method fetch/render states.
