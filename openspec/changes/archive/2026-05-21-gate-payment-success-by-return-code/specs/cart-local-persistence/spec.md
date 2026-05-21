## MODIFIED Requirements

### Requirement: Cart SHALL be cleared after payment success return
The system SHALL clear local cart state only when the payment return page is reached with successful provider return code `0`.

#### Scenario: Successful payment return clears cart
- **WHEN** user opens `/payment/success` with `RETURN_CODE=0`
- **THEN** the cart is cleared using existing cart clearing behavior

#### Scenario: Non-success payment return keeps cart
- **WHEN** user opens `/payment/success` with `RETURN_CODE=1`, `RETURN_CODE=4`, `RETURN_CODE=10`, missing `RETURN_CODE`, or unknown `RETURN_CODE`
- **THEN** the cart is not cleared
