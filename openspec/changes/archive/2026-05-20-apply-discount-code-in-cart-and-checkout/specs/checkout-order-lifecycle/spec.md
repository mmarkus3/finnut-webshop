## ADDED Requirements

### Requirement: Checkout Order Payload Carries Active Discount Code
Checkout lifecycle SHALL include active discount code in order persistence payloads when discount is active.

#### Scenario: Active discount forwarded to backend during checkout progression
- **WHEN** user has active discount code and checkout triggers order create or update
- **THEN** request payload sent to backend includes `order.discount` with the active code

#### Scenario: No active discount does not force invalid discount payload
- **WHEN** user has not applied a discount code
- **THEN** order payload does not include invalid discount value
- **AND** existing non-discount checkout behavior remains unchanged
