## ADDED Requirements

### Requirement: Mixed Cart Discount Totals Use Product-Level Percentages
Cart summary totals SHALL apply discounts only for products that have product-level campaign discount percentages.

#### Scenario: Cart has both discounted and non-discounted products
- **WHEN** active campaign includes discount for subset of cart products
- **THEN** discounted subtotal is calculated from discounted lines plus unchanged non-discounted lines
- **AND** original subtotal remains available for comparison display
