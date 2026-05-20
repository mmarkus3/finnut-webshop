## 1. Data And Pricing Helpers

- [x] 1.1 Extend product type to include optional `discountPrice` and `lowestRetailPriceLast30Days`.
- [x] 1.2 Update shared price helper logic to derive discount-vs-regular display state consistently.
- [x] 1.3 Ensure currency formatting is applied to discount, retail, and 30-day lowest prices.

## 2. Product UI Updates

- [x] 2.1 Update product listing/card views to show discount price in red and retail price overlined when discount exists.
- [x] 2.2 Update product detail price area to show discount price in red and retail price overlined when discount exists.
- [x] 2.3 Render `Alin hinta edellisen 30 päivän aikana` with `lowestRetailPriceLast30Days` when discount exists and value is available.

## 3. Verification

- [x] 3.1 Add/update tests for listing price rendering in discount and non-discount states.
- [x] 3.2 Add/update tests for detail price rendering in discount and non-discount states.
- [x] 3.3 Run relevant Jest suites and confirm pricing behavior remains stable.
