## ADDED Requirements

### Requirement: Product-Level Fixed Discount Price Support
The system SHALL support product-level `discountFixed` values from active campaign data for cart/checkout pricing.

#### Scenario: Product has fixed discount value in campaign
- **WHEN** a cart/checkout line item matches a campaign product entry with valid `discountFixed`
- **THEN** line-item discounted unit price uses `discountFixed`
- **AND** original unit price remains visible for comparison

#### Scenario: Product has both fixed and percentage discount fields
- **WHEN** matching campaign product entry contains both `discountFixed` and `discountPercentage`
- **THEN** fixed discount value is used as effective discounted unit price

#### Scenario: Product has no valid fixed discount value
- **WHEN** matching campaign product entry lacks valid `discountFixed`
- **THEN** system falls back to existing percentage/no-discount calculation behavior
