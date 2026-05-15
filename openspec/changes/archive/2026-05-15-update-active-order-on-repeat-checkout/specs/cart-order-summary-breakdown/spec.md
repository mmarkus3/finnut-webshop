## ADDED Requirements

### Requirement: Checkout CTA SHALL navigate only after successful active-order sync
The system SHALL navigate to checkout only after create/update synchronization succeeds.

#### Scenario: Successful update then navigation
- **WHEN** active-order update request succeeds
- **THEN** system navigates from cart to checkout page with the active order context
