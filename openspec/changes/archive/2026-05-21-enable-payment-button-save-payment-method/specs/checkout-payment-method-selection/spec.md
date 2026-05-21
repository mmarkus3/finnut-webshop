## ADDED Requirements

### Requirement: Checkout payment step SHALL gate payment action by payment method selection
The system SHALL show a payment action on the payment-method step and SHALL enable it only after the user has selected a payment method.

#### Scenario: Payment action is disabled before selection
- **WHEN** the payment-method step renders and no payment method is selected
- **THEN** the payment action button labeled with `checkout.payButton` is disabled

#### Scenario: Payment action is enabled after selection
- **WHEN** the user selects a payment method
- **THEN** the payment action button labeled with `checkout.payButton` becomes enabled

#### Scenario: Payment action preserves selected payment method
- **WHEN** the user presses the enabled payment action button
- **THEN** the system uses the selected payment method ID as the payment method value for order persistence
