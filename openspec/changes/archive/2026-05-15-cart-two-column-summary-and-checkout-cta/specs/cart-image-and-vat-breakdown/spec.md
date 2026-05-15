## ADDED Requirements

### Requirement: Cart page layout SHALL be split by viewport size
The system SHALL present cart items and summary in a two-column arrangement on larger screens and a stacked arrangement on mobile screens.

#### Scenario: Desktop shows items left and summary right
- **WHEN** cart page is viewed on desktop viewport
- **THEN** line items are rendered in the left content column and order summary is rendered in the right column

#### Scenario: Mobile shows items above summary
- **WHEN** cart page is viewed on mobile viewport
- **THEN** line items are rendered first and summary is rendered below them
