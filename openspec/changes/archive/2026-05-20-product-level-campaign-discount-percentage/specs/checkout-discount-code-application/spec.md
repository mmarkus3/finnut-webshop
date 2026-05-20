## ADDED Requirements

### Requirement: Product-Level Campaign Discount Mapping
The system SHALL derive discount percentage from campaign product-level data using campaign interface types, and SHALL not assume one global campaign percentage.

#### Scenario: Campaign contains product-specific discount entries
- **WHEN** campaign data includes product-level `discountPercentage` values
- **THEN** system maps discount values by product identifier
- **AND** each cart/checkout line item uses its own mapped percentage if available

#### Scenario: Product is not present in campaign discount entries
- **WHEN** cart line item product has no matching campaign product-level entry
- **THEN** no discount is applied to that line item
- **AND** original pricing remains active for that line item
