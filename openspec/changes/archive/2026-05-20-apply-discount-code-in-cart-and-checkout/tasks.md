## 1. Discount Fetch And State

- [x] 1.1 Integrate campaign code lookup into cart/checkout flow with input + apply action.
- [x] 1.2 Add active discount state handling (success, invalid code, reset/replace code).

## 2. Pricing Calculations And Display

- [x] 2.1 Add shared discount calculation helper for percentage-based discounts.
- [x] 2.2 Update cart row pricing to show original and discounted price when discount is active.
- [x] 2.3 Update cart/checkout summaries to use discounted totals and preserve original price visibility where required.

## 3. Order Persistence

- [x] 3.1 Extend order payload typing/model to support `discount` field.
- [x] 3.2 Include active discount code in order create request payload.
- [x] 3.3 Include active discount code in order update request payload when cart/checkout state changes.

## 4. Verification

- [x] 4.1 Add/update tests for discount calculation logic (including percentage math and rounding behavior).
- [x] 4.2 Add/update tests for cart/checkout display and totals with/without active discount.
- [x] 4.3 Add/update tests for order create/update payloads including `order.discount`.
- [x] 4.4 Run relevant Jest suites and confirm no regressions.
