## ADDED Requirements

### Requirement: Payment-method fetch implementation SHALL use shared HTTP helper
The system SHALL execute payment-method API requests through a shared HTTP helper module rather than direct axios usage inside payment-method hook.

#### Scenario: Payment-method hook delegates request to shared helper
- **WHEN** checkout payment step fetches payment methods
- **THEN** payment-method hook uses shared helper to perform GET request and preserves existing endpoint behavior
