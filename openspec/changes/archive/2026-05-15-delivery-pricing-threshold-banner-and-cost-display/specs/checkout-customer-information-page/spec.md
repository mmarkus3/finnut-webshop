## ADDED Requirements

### Requirement: Checkout summary delivery cost SHALL use fetched threshold pricing
The system SHALL compute checkout delivery summary using fetched `over` and `delivery` values.

#### Scenario: Checkout delivery reflects threshold rule
- **WHEN** checkout summary is rendered
- **THEN** delivery value is free for totals at/above `over`, otherwise `delivery` fee is shown
