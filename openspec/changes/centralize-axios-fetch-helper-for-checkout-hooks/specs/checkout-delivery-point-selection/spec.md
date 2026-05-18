## ADDED Requirements

### Requirement: Delivery-point fetch implementation SHALL use shared HTTP helper
The system SHALL execute delivery-point API requests through a shared HTTP helper module rather than direct axios usage inside delivery-point hook.

#### Scenario: Delivery-point hook delegates request to shared helper
- **WHEN** checkout requests delivery points by postal code
- **THEN** delivery-point hook uses shared helper to perform GET request and preserves existing endpoint/params behavior
