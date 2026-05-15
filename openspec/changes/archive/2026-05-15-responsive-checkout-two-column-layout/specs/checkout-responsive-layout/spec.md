## ADDED Requirements

### Requirement: Checkout SHALL use responsive two-section layout
The system SHALL arrange checkout customer information and summary sections according to viewport size.

#### Scenario: Desktop uses side-by-side layout
- **WHEN** checkout page is rendered on desktop viewport
- **THEN** customer information section is shown on the left and summary section is shown on the right

#### Scenario: Mobile uses stacked layout
- **WHEN** checkout page is rendered on mobile viewport
- **THEN** customer information section is shown on top and summary section is shown below
