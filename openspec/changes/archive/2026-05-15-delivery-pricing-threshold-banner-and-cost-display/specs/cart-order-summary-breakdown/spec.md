## ADDED Requirements

### Requirement: Cart summary delivery cost SHALL use fetched threshold pricing
The system SHALL compute cart delivery row from fetched `over` and `delivery` values.

#### Scenario: Cart total below threshold shows delivery fee
- **WHEN** cart total is less than `over`
- **THEN** cart summary delivery row displays `delivery` price

#### Scenario: Cart total at or above threshold shows free delivery
- **WHEN** cart total is equal to or greater than `over`
- **THEN** cart summary delivery row indicates free delivery
