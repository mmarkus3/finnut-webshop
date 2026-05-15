## ADDED Requirements

### Requirement: Cart-to-checkout flow SHALL persist and reuse active order id
The system SHALL persist the created order id and reuse it for continued shopping-to-checkout transitions until cleared.

#### Scenario: Continued shopping keeps same order
- **WHEN** user starts checkout, returns to shopping, then proceeds again
- **THEN** the flow reuses the stored active order id for the in-progress order
