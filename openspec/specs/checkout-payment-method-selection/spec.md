# checkout-payment-method-selection Specification

## Purpose
TBD - created by archiving change checkout-payment-method-selection-step. Update Purpose after archive.
## Requirements
### Requirement: Checkout SHALL fetch payment methods for payment step
The system SHALL fetch payment methods from company-scoped payment-methods endpoint when entering or loading payment-method selection step.

#### Scenario: Payment methods request is sent
- **WHEN** user navigates to payment-method checkout step
- **THEN** system performs GET request to `/orders/company/${process.env.EXPO_PUBLIC_COMPANY}/paymentMethods` using `process.env.EXPO_PUBLIC_FIREBASE_API` base URL

### Requirement: Checkout payment step SHALL display payment methods with fetch states
The system SHALL display payment methods list, include available payment method images, and handle loading, empty, and error states.

#### Scenario: Payment methods are shown for selection
- **WHEN** payment methods endpoint returns items
- **THEN** payment methods are displayed in selectable list on left section
- **AND** each payment method with an image URL displays that image alongside the method name

#### Scenario: Payment method without image is shown for selection
- **WHEN** payment methods endpoint returns an item without an image URL
- **THEN** the payment method remains displayed as a selectable text option

#### Scenario: Payment methods state feedback is shown
- **WHEN** payment-method fetch is pending, fails, or returns no items
- **THEN** corresponding loading/error/empty message is shown

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

### Requirement: Checkout payment step SHALL keep previous summary semantics
The system SHALL display order summary on payment step using the same summary rows and totals as previous checkout step.

#### Scenario: Payment step summary mirrors previous checkout summary
- **WHEN** payment-method step renders
- **THEN** product and price summary matches checkout summary semantics from previous step
