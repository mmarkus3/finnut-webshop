## MODIFIED Requirements

### Requirement: System SHALL provide dedicated checkout page with customer information form
The system SHALL route users to a checkout page that requests customer information fields required by the order model.

#### Scenario: Checkout page shows customer form
- **WHEN** user opens checkout page after cart checkout action
- **THEN** the page displays input fields for first name, last name, email, phone number, street address, city, and zip code
