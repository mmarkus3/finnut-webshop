## ADDED Requirements

### Requirement: Cart Price Presentation Supports Discounted And Original Prices
The cart SHALL show discounted prices and original prices when a valid discount campaign is active.

#### Scenario: Cart row shows original and discounted price
- **WHEN** cart contains products and a valid discount is active
- **THEN** each affected cart row shows discounted price as active price
- **AND** each affected cart row shows original price as reference

#### Scenario: Cart summary uses discounted totals
- **WHEN** cart contains products and a valid discount is active
- **THEN** subtotal and total calculations use discounted line prices
