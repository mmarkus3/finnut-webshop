## ADDED Requirements

### Requirement: Delivery-pricing fetch implementation SHALL use shared HTTP helper
The system SHALL execute delivery-pricing API requests through a shared HTTP helper module rather than direct axios usage inside delivery-pricing hook.

#### Scenario: Delivery-pricing hook delegates request to shared helper
- **WHEN** app loads delivery pricing
- **THEN** delivery-pricing hook uses shared helper to perform GET request and preserves existing endpoint behavior
