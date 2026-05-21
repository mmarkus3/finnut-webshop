## 1. Payment Method Data

- [x] 1.1 Verify `hooks/paymentMethods.ts` keeps normalizing the API `img` field into `PaymentMethod.img`.
- [x] 1.2 Update payment-method helper tests to assert image URL normalization and blank-image fallback behavior.

## 2. Checkout Payment List UI

- [x] 2.1 Import and use React Native `Image` in `components/checkout/CheckoutPage.tsx`.
- [x] 2.2 Render a fixed-size payment method image beside the method name when `method.img` is present.
- [x] 2.3 Keep text-only selectable rows working for payment methods with no image URL.
- [x] 2.4 Preserve existing selected styling, press behavior, and accessibility labels.

## 3. Verification

- [x] 3.1 Update checkout payment-step tests to cover image rendering for methods with `img`.
- [x] 3.2 Run the relevant Jest tests for payment methods and checkout.
