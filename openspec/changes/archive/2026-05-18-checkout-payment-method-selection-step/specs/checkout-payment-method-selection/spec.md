## ADDED Requirements

### Requirement: Checkout SHALL fetch payment methods for payment step
The system SHALL fetch payment methods from company-scoped payment-methods endpoint when entering or loading payment-method selection step.

#### Scenario: Payment methods request is sent
- **WHEN** user navigates to payment-method checkout step
- **THEN** system performs GET request to `/orders/company/${process.env.EXPO_PUBLIC_COMPANY}/paymentMethods` using `process.env.EXPO_PUBLIC_FIREBASE_API` base URL

### Requirement: Checkout payment step SHALL display payment methods with fetch states
The system SHALL display payment methods list and handle loading, empty, and error states.

#### Scenario: Payment methods are shown for selection
- **WHEN** payment methods endpoint returns items
- **THEN** payment methods are displayed in selectable list on left section

#### Scenario: Payment methods state feedback is shown
- **WHEN** payment-method fetch is pending, fails, or returns no items
- **THEN** corresponding loading/error/empty message is shown

### Requirement: Checkout payment step SHALL keep previous summary semantics
The system SHALL display order summary on payment step using the same summary rows and totals as previous checkout step.

#### Scenario: Payment step summary mirrors previous checkout summary
- **WHEN** payment-method step renders
- **THEN** product and price summary matches checkout summary semantics from previous step
