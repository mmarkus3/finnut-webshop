## ADDED Requirements

### Requirement: Proceed-to-checkout flow SHALL branch between create and update paths
The system SHALL create order when no active order id exists and update order when active order id exists.

#### Scenario: No active order id uses create path
- **WHEN** user proceeds to checkout without stored active order id
- **THEN** system creates a new backend order from cart payload

#### Scenario: Active order id uses update path
- **WHEN** user proceeds to checkout with stored active order id
- **THEN** system updates that backend order using latest cart payload
