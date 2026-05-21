## MODIFIED Requirements

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
