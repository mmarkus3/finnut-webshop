## ADDED Requirements

### Requirement: Active order lifecycle SHALL include delivery method update stage
The system SHALL support updating active order delivery method after checkout order creation/update phase.

#### Scenario: Active order receives delivery method later in checkout
- **WHEN** active order already exists and delivery method is selected
- **THEN** active order is updated with delivery method id without creating a new order
