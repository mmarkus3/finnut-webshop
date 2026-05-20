## 1. Campaign Discount Model

- [x] 1.1 Extend campaign product typing to include optional `discountFixed`.
- [x] 1.2 Update discount mapping helpers to resolve fixed and percentage discount data per product.

## 2. Pricing Behavior

- [x] 2.1 Update line discount calculation to prioritize valid fixed discount values.
- [x] 2.2 Ensure cart/checkout totals use fixed discounted prices where applicable.
- [x] 2.3 Preserve original + discounted price presentation for affected rows and summaries.

## 3. Verification

- [x] 3.1 Add/update tests for fixed discount mapping and precedence over percentage.
- [x] 3.2 Add/update tests for mixed-cart totals with fixed discount entries.
- [x] 3.3 Run relevant Jest suites and confirm no regressions.
