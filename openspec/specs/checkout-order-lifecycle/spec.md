# checkout-order-lifecycle Specification

## Purpose
TBD - created by archiving change apply-discount-code-in-cart-and-checkout. Update Purpose after archive.
## Requirements
### Requirement: Checkout Order Payload Carries Active Discount Code
Checkout lifecycle SHALL include active discount code in order persistence payloads when discount is active.

#### Scenario: Active discount forwarded to backend during checkout progression
- **WHEN** user has active discount code and checkout triggers order create or update
- **THEN** request payload sent to backend includes `order.discount` with the active code

#### Scenario: No active discount does not force invalid discount payload
- **WHEN** user has not applied a discount code
- **THEN** order payload does not include invalid discount value
- **AND** existing non-discount checkout behavior remains unchanged

### Requirement: Checkout payment action SHALL persist payment method and success return URL
Checkout lifecycle SHALL update the active order with selected payment metadata before continuing to payment.

#### Scenario: Selected payment method and return URL are saved
- **WHEN** the user presses the enabled payment action button with active order ID `order-1` and selected payment method `pm-1`
- **THEN** the system patches order `order-1` with `paymentMethod` set to `pm-1`
- **AND** the same patch sets `returnUrl` to `{host}/payment/success`

#### Scenario: Payment persistence is blocked without active order
- **WHEN** the payment-method step has no active order ID
- **THEN** the system does not attempt to persist payment metadata
- **AND** the payment action remains disabled
