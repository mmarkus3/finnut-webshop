## 1. Campaign Typing And Mapping

- [x] 1.1 Update/confirm campaign interfaces to represent product-level discount structure used by backend.
- [x] 1.2 Add helper(s) to map campaign product discounts by normalized product identifier.

## 2. Discount Calculation Refactor

- [x] 2.1 Refactor line-price discount calculation to resolve per-product percentage from campaign data.
- [x] 2.2 Refactor cart totals calculation for mixed discounted/non-discounted carts.
- [x] 2.3 Keep original price and discounted price display behavior intact with updated calculation source.

## 3. Verification

- [x] 3.1 Add/update tests for campaign product-level discount mapping.
- [x] 3.2 Add/update tests for mixed-cart discount totals and rounding behavior.
- [x] 3.3 Run relevant Jest suites and confirm no regressions.
