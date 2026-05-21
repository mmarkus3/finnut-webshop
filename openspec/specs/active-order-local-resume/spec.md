# active-order-local-resume Specification

## Purpose
Define local active order persistence used to resume checkout after leaving and returning to shopping.

## Requirements
### Requirement: Active order id SHALL be saved locally after backend order creation
The system SHALL store the active backend order id in local storage after successful order creation.

#### Scenario: Save active order id
- **WHEN** backend returns a created order id
- **THEN** the id is written to the configured local storage key

### Requirement: Active order id SHALL be restorable for checkout continuation
The system SHALL read the stored active order id and use it to continue the same order context.

#### Scenario: Restore active order id
- **WHEN** user returns to checkout flow and stored order id exists
- **THEN** the stored id is used for checkout continuation instead of creating a new order

#### Scenario: Invalid stored order id fallback
- **WHEN** stored order id is missing, malformed, or unusable
- **THEN** flow safely falls back to creating/using a new valid order id without crashing
