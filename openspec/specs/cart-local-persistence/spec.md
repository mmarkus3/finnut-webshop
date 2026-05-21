# cart-local-persistence Specification

## Purpose
TBD - created by archiving change persist-cart-in-local-storage. Update Purpose after archive.
## Requirements
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

### Requirement: Cart SHALL be cleared after payment success return
The system SHALL clear local cart state only when the payment return page is reached with successful provider return code `0`.

#### Scenario: Successful payment return clears cart
- **WHEN** user opens `/payment/success` with `RETURN_CODE=0`
- **THEN** the cart is cleared using existing cart clearing behavior

#### Scenario: Non-success payment return keeps cart
- **WHEN** user opens `/payment/success` with `RETURN_CODE=1`, `RETURN_CODE=4`, `RETURN_CODE=10`, missing `RETURN_CODE`, or unknown `RETURN_CODE`
- **THEN** the cart is not cleared
