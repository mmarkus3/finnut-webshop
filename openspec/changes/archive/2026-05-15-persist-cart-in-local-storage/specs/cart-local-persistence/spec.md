## ADDED Requirements

### Requirement: Cart state SHALL be persisted in local storage
The system SHALL save cart state to local storage whenever cart contents change.

#### Scenario: Cart write after mutation
- **WHEN** a cart item is added, incremented, decremented, removed, or cart is cleared
- **THEN** the updated cart state is written to the configured local storage key

### Requirement: Cart state SHALL be restored from local storage on initialization
The system SHALL attempt to restore cart state from local storage when the cart provider initializes.

#### Scenario: Stored cart is available
- **WHEN** a valid stored cart payload exists for the cart storage key
- **THEN** the cart provider initializes with the stored items instead of an empty cart

#### Scenario: Stored cart is missing or invalid
- **WHEN** no stored payload exists or payload is invalid/corrupted
- **THEN** the cart provider falls back to an empty cart state without crashing
