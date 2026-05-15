# checkout-customer-information-page Specification

## Purpose
TBD - created by archiving change checkout-order-post-and-customer-info-page. Update Purpose after archive.
## Requirements
### Requirement: System SHALL provide dedicated checkout page with customer information form
The system SHALL route users to a checkout page that requests customer information fields required by the order model.

#### Scenario: Checkout page shows customer form
- **WHEN** user opens checkout page after cart checkout action
- **THEN** the page displays input fields for first name, last name, email, street address, city, and zip code

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

