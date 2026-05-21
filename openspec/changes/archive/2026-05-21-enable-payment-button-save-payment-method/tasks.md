## 1. Payment Persistence

- [x] 1.1 Add a focused helper for patching active order payment metadata with `paymentMethod` and `returnUrl`.
- [x] 1.2 Add tests for the payment persistence helper, including selected method and success return URL payload.
- [x] 1.3 Add or update a small host/return-url resolver that produces `{host}/payment/success` in web runtime.

## 2. Checkout Payment Action UI

- [x] 2.1 Add `checkout.payButton` and any required payment-save state/error translation keys for Finnish, English, and Swedish.
- [x] 2.2 Render the payment action button on the payment-method step.
- [x] 2.3 Keep the payment action disabled until a payment method is selected and active order ID exists.
- [x] 2.4 On press, save selected payment metadata to the active order using the persistence helper.
- [x] 2.5 Preserve existing payment-method fetch, display, selection, and summary behavior.

## 3. Verification

- [x] 3.1 Update checkout tests to cover disabled-before-selection and enabled-after-selection payment button behavior.
- [x] 3.2 Update checkout tests to cover pressing the payment button saves `paymentMethod` and `returnUrl`.
- [x] 3.3 Run relevant Jest tests for checkout and payment persistence.
