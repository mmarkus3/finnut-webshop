## Context

The checkout payment step already fetches payment methods and stores the selected method ID in local state. Delivery-method persistence is handled through a small patch helper that updates the active order. The next payment action should follow the same pattern: once a payment method is selected, expose a localized payment button and patch the active order with payment metadata needed by the backend.

## Goals / Non-Goals

**Goals:**

- Add a payment button on the payment-method step, labeled via i18next with Finnish text "Maksa".
- Enable the payment button only when `selectedPaymentMethodId` has a value and an active order ID is available.
- Patch the active order with `{ paymentMethod: selectedPaymentMethodId, returnUrl: "{host}/payment/success" }`.
- Resolve `{host}` from the current web origin at runtime, producing values such as `https://example.com/payment/success`.
- Surface a loading/disabled state while the payment metadata is being saved.

**Non-Goals:**

- Redirecting to a payment provider or rendering provider-hosted payment UI.
- Changing payment-method fetching or selection semantics.
- Reworking the full order model interface; use a narrow patch payload for payment persistence if typing requires it.
- Handling payment failure, cancellation, or return-success page behavior.

## Decisions

- Add a dedicated payment persistence helper, similar to `saveDeliveryMethodToOrder`, that depends on `OrdersService.patch`. This keeps payment-specific order updates isolated and easy to test.
- Compute the return URL in checkout UI or a small helper using the browser origin when available. This matches the requested `{host}/payment/success` behavior for the web checkout target.
- Keep the selected payment method value as the persisted value. The API payment method payload exposes the selection identifier as the normalized `PaymentMethod.id`, and that is what the UI already uses for selection state.
- Add a new `checkout.payButton` translation key instead of hard-coding "Maksa", preserving the current localization pattern.

## Risks / Trade-offs

- Host resolution can differ outside web runtime -> guard access to `window.location.origin` and keep the helper testable.
- Patch can fail -> keep the button disabled during save and expose an error state/message rather than silently failing.
- Active order ID can be missing -> keep the payment button disabled because there is no order to patch.
