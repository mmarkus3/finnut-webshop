## Why

Checkout currently lets users select a payment method but does not provide a final payment action that persists that choice to the active order. The order needs the selected payment method and a success return URL before the user can continue into payment.

## What Changes

- Add a payment action button labeled with `checkout.payButton` text, translated as "Maksa" in Finnish, on the payment-method step.
- Keep the payment button disabled until the user has selected a payment method.
- When the user presses the payment button, save the selected payment method to `order.paymentMethod`.
- Set `order.returnUrl` to `{host}/payment/success` in the same order update.
- Preserve existing payment-method loading, empty, error, and selection behavior.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `checkout-payment-method-selection`: Payment-method step SHALL expose a payment button that becomes enabled after a payment method is selected.
- `checkout-order-lifecycle`: Checkout order updates SHALL persist selected payment method and success return URL before payment.

## Impact

- Affected UI: `components/checkout/CheckoutPage.tsx` payment-method step.
- Affected order persistence: new or updated helper that patches the active order with `paymentMethod` and `returnUrl`.
- Affected types: add a narrow payment persistence payload type if needed; avoid broad order model changes.
- Affected localization: add `checkout.payButton` translations.
- Affected tests: checkout payment-step button gating, order patch helper, and order type/payload expectations where relevant.
