## 1. Order Retrieval And Route

- [x] 1.1 Add an unlinked `/order` Expo Router screen that reads the `orderId` query parameter and uses the existing global page/footer composition.
- [x] 1.2 Add an order-details fetching helper or hook that constructs the company-scoped `OrdersService` and calls `get(orderId)` without changing `/types` model interfaces.
- [x] 1.3 Implement missing-order-ID, loading, and retrieval-error states so no invalid or stale order content is displayed.

## 2. Order Details Presentation

- [x] 2.1 Create an order details component that displays the fetched order ID and a `draft`, `pending`, `placed`, `sent` timeline.
- [x] 2.2 Implement timeline presentation mapping completed statuses to light green, the current status to green, future statuses to gray, and unknown statuses to a safe fallback.
- [x] 2.3 Display ordered products with name, amount, and localized `finalPrice` values.
- [x] 2.4 Calculate and display the localized order sum from product amounts and final prices, with an unavailable state when prices required for the sum are absent.
- [x] 2.5 Display returned customer name, contact information, and address, including an unavailable-customer state.

## 3. Localization

- [x] 3.1 Add Finnish order-details headings, status labels, field labels, and state messages.
- [x] 3.2 Add English order-details headings, status labels, field labels, and state messages.
- [x] 3.3 Add Swedish order-details headings, status labels, field labels, and state messages.

## 4. Verification

- [x] 4.1 Add tests for query-parameter order selection, `OrdersService.get` retrieval, and missing/loading/error handling.
- [x] 4.2 Add tests for timeline step styling across current, previous, future, and unknown status cases.
- [x] 4.3 Add tests for product lines, calculated total/unavailable-price handling, customer information, and supported localized labels.
- [x] 4.4 Run relevant Jest tests and web/frontend verification for the direct order-details URL.
