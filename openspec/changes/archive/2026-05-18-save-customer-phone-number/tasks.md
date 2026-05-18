## 1. Checkout Customer Form Updates

- [x] 1.1 Add `phone` field to checkout customer state/model and keep existing form behavior intact.
- [x] 1.2 Add phone number input to checkout customer information UI with i18n label/placeholder and accessibility support.

## 2. Order Payload Persistence

- [x] 2.1 Include customer phone number in the order create/update payload mapping used by checkout.
- [x] 2.2 Ensure missing/empty phone input is handled safely without breaking checkout flow.

## 3. Localization and Verification

- [x] 3.1 Add translation keys for phone number field in supported locales.
- [x] 3.2 Add/update Jest tests to verify phone input rendering and payload persistence with phone value.
