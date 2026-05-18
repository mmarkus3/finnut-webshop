## ADDED Requirements

### Requirement: Cart add action SHALL support multi-quantity payload
The system SHALL allow add-to-cart operation to add more than one piece in a single action.

#### Scenario: Adding multiple pieces in one action
- **WHEN** add-to-cart is invoked with quantity greater than 1
- **THEN** cart line quantity increases by the requested amount, capped by available stock
