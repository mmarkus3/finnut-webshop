## ADDED Requirements

### Requirement: Customer information SHALL be persisted with delivery method selection
The system SHALL use the current required checkout customer information as the customer payload when persisting delivery method selection.

#### Scenario: Customer payload is sourced from checkout form
- **WHEN** required customer fields are filled and user selects a delivery method
- **THEN** the active order update includes the current first name, last name, email, phone number, street address, city, and zip code values
