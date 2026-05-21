## ADDED Requirements

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
