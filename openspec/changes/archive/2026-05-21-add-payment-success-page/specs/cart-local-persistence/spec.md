## ADDED Requirements

### Requirement: Cart SHALL be cleared after payment success return
The system SHALL clear local cart state when the payment success return page is reached.

#### Scenario: Payment success clears cart
- **WHEN** user opens `/payment/success`
- **THEN** the cart is cleared using existing cart clearing behavior
