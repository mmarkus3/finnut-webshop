## ADDED Requirements

### Requirement: Existing active order SHALL be updated from latest cart before checkout continuation
The system SHALL update the backend active order with current cart payload when user proceeds to checkout and active order id exists.

#### Scenario: Active order is updated on repeated checkout
- **WHEN** user has stored active order id and cart contents differ from prior checkout state
- **THEN** system sends an order update request with current cart products and quantities before navigating to checkout

### Requirement: Update failure SHALL block checkout navigation and show recoverable error
The system SHALL prevent checkout navigation when active order update fails.

#### Scenario: Active order update fails
- **WHEN** backend update request for active order returns error
- **THEN** user remains on cart page and receives error feedback with option to retry
