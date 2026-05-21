# checkout-customer-information-page Specification

## Purpose
TBD - created by archiving change checkout-order-post-and-customer-info-page. Update Purpose after archive.
## Requirements
### Requirement: System SHALL provide dedicated checkout page with customer information form
The system SHALL route users to a checkout page that requests customer information fields required by the order model.

#### Scenario: Checkout page shows customer form
- **WHEN** user opens checkout page after cart checkout action
- **THEN** the page displays input fields for first name, last name, email, phone number, street address, city, and zip code

### Requirement: Checkout page SHALL display cart-like order summary
The system SHALL display ordered products and price summary on checkout page using the same summary semantics as cart page.

#### Scenario: Checkout summary mirrors cart structure
- **WHEN** checkout page is rendered with order/cart data
- **THEN** product line items and price summary rows are visible in checkout view

### Requirement: Checkout page SHALL keep customer section first in reading order
The system SHALL render customer information before summary in markup order to preserve top-first mobile flow and accessibility reading order.

#### Scenario: Customer section appears first in checkout content order
- **WHEN** checkout page content is rendered
- **THEN** customer information section appears before summary section in page structure

### Requirement: Delivery-point step SHALL follow customer information entry
The system SHALL provide delivery-point selection as continuation step after customer information is entered.

#### Scenario: Customer details precede delivery-point selection
- **WHEN** user completes required customer fields including postal code
- **THEN** checkout enables delivery-point retrieval and selection UI

### Requirement: Checkout summary delivery cost SHALL use fetched threshold pricing
The system SHALL compute checkout delivery summary using fetched `over` and `delivery` values.

#### Scenario: Checkout delivery reflects threshold rule
- **WHEN** checkout summary is rendered
- **THEN** delivery value is free for totals at/above `over`, otherwise `delivery` fee is shown

### Requirement: Checkout SHALL allow progressing to payment step only after required data
The system SHALL enable navigation to payment-method step only when customer information is filled and a delivery method has been selected.

#### Scenario: Progression is enabled after customer and delivery completion
- **WHEN** required customer fields are present and delivery method is selected
- **THEN** user can navigate to payment-method checkout step

#### Scenario: Progression remains disabled when required data is missing
- **WHEN** customer fields are incomplete or delivery method is not selected
- **THEN** payment-step navigation control is disabled and checkout remains on current step

### Requirement: Customer information SHALL be persisted with delivery method selection
The system SHALL use the current required checkout customer information as the customer payload when persisting delivery method selection.

#### Scenario: Customer payload is sourced from checkout form
- **WHEN** required customer fields are filled and user selects a delivery method
- **THEN** the active order update includes the current first name, last name, email, phone number, street address, city, and zip code values

### Requirement: Checkout entry SHALL support order resume by stored active order id
The system SHALL allow checkout page to open in context of previously saved active order id.

#### Scenario: Returning user resumes existing order
- **WHEN** user re-enters checkout after navigating away and an active order id is stored
- **THEN** checkout page continues with that same order context
