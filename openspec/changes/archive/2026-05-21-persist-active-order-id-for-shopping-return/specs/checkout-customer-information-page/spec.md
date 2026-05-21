## ADDED Requirements

### Requirement: Checkout entry SHALL support order resume by stored active order id
The system SHALL allow checkout page to open in context of previously saved active order id.

#### Scenario: Returning user resumes existing order
- **WHEN** user re-enters checkout after navigating away and an active order id is stored
- **THEN** checkout page continues with that same order context
