## ADDED Requirements

### Requirement: Cart And Checkout Totals Reflect Fixed Discount Prices
Cart and checkout summary calculations SHALL incorporate product-level fixed discounted prices when present.

#### Scenario: Mixed fixed-discount and regular products in cart
- **WHEN** cart contains products with fixed campaign discounts and products without discounts
- **THEN** discounted subtotal and total are calculated using fixed discounted prices for matching products and original prices for others
- **AND** summary display remains consistent with line-item displayed prices
