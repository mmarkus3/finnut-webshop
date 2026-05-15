## 1. Delivery Points Data Fetch

- [x] 1.1 Add delivery-points fetch helper using `process.env.EXPO_PUBLIC_FIREBASE_API!` and `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/points?postalCode=xxxxx`.
- [x] 1.2 Wire checkout postal code input to trigger fetch flow with loading/error handling.
- [x] 1.3 Normalize response and limit displayed results to top 10.

## 2. Checkout UI Selection

- [x] 2.1 Add delivery-points section in checkout page after customer info fields.
- [x] 2.2 Render single-select list for returned points and persist selected point in component/checkout state.
- [x] 2.3 Add empty/error/loading messages for points retrieval outcomes.

## 3. Localization And Tests

- [x] 3.1 Add i18n keys for delivery-points labels, actions, and state messages.
- [x] 3.2 Add tests for points fetch request parameters and top-10 limiting.
- [x] 3.3 Add checkout UI tests for points rendering, selection behavior, and fetch states.
