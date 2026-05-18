## ADDED Requirements

### Requirement: Delivery-point selection SHALL trigger persistence to active order
The system SHALL persist selected delivery point id as order delivery method value.

#### Scenario: Point selection persists method id
- **WHEN** user selects one delivery point from list
- **THEN** selected point id is sent to backend as order `deliveryMethod` value
