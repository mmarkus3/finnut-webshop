## ADDED Requirements

### Requirement: Checkout SHALL allow progressing to payment step only after required data
The system SHALL enable navigation to payment-method step only when customer information is filled and a delivery method has been selected.

#### Scenario: Progression is enabled after customer and delivery completion
- **WHEN** required customer fields are present and delivery method is selected
- **THEN** user can navigate to payment-method checkout step

#### Scenario: Progression remains disabled when required data is missing
- **WHEN** customer fields are incomplete or delivery method is not selected
- **THEN** payment-step navigation control is disabled and checkout remains on current step
