## ADDED Requirements

### Requirement: VAT SHALL Be Calculated From Product Tax Decimal
The system SHALL calculate VAT contribution for each cart line item using `product.tax` as decimal percentage (for example `0.255`).

#### Scenario: VAT computed from decimal tax
- **WHEN** line item has unit price, quantity, and tax value `0.255`
- **THEN** VAT contribution is calculated as `unitPrice * quantity * 0.255`

#### Scenario: Missing tax value defaults to zero
- **WHEN** line item has no valid `product.tax`
- **THEN** VAT contribution for that line item is treated as `0`

### Requirement: Cart VAT Summary SHALL Aggregate Line Item VAT
The system SHALL aggregate VAT contributions from all cart line items into a single VAT summary value.

#### Scenario: Aggregated VAT shown in summary
- **WHEN** cart has multiple line items
- **THEN** summary VAT equals the sum of all line-item VAT contributions
