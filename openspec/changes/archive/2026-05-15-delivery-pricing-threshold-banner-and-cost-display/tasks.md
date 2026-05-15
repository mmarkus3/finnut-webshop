## 1. Delivery Pricing Fetch

- [x] 1.1 Add pricing fetch helper for GET `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/prices`.
- [x] 1.2 Initialize pricing fetch early in app lifecycle and expose pricing state globally.
- [x] 1.3 Add fallback handling for unavailable pricing response.

## 2. Global Banner And Summary Integration

- [x] 2.1 Add global banner under header on all pages for free-delivery-over-threshold message.
- [x] 2.2 Update cart summary delivery row to use threshold-based dynamic delivery cost.
- [x] 2.3 Update checkout summary delivery row to use threshold-based dynamic delivery cost.

## 3. Localization And Verification

- [x] 3.1 Add i18n keys for threshold banner and delivery-cost/free-delivery messages.
- [x] 3.2 Add tests for pricing fetch and threshold logic branching.
- [x] 3.3 Add/update UI tests for banner visibility and cart/checkout delivery value rendering.
