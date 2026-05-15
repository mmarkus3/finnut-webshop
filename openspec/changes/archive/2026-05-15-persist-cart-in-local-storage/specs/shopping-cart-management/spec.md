## ADDED Requirements

### Requirement: Cart lifecycle SHALL preserve user selections across refresh
The system SHALL retain cart selections across app refresh by restoring persisted cart state.

#### Scenario: Refresh keeps prior cart items
- **WHEN** a user refreshes/reopens the app after previously adding cart items
- **THEN** the same cart items and quantities are shown after initialization completes
