# cart-image-and-vat-breakdown Specification

## Purpose
TBD - created by archiving change cart-image-and-vat-summary. Update Purpose after archive.
## Requirements
### Requirement: Cart Line Items SHALL Show Product Image With Fallback
The system SHALL render a product image for each cart line item and SHALL use a fallback placeholder image when no usable product image exists.

#### Scenario: Cart item shows product image
- **WHEN** a cart line item has a usable product image
- **THEN** the cart item displays that product image

#### Scenario: Cart item without image shows fallback
- **WHEN** a cart line item has no usable product image
- **THEN** the cart item displays the configured fallback image

### Requirement: Cart Summary SHALL Show VAT Amount
The system SHALL display VAT amount in cart summary in addition to total price.

#### Scenario: VAT amount is displayed
- **WHEN** cart contains one or more items
- **THEN** cart summary displays total price and VAT amount

### Requirement: Cart price values SHALL include localized currency
The system SHALL display cart line-item price, VAT summary value, and total summary value with locale-specific currency markers.

#### Scenario: Cart values include locale currency
- **WHEN** the cart page renders line-item and summary price values
- **THEN** each shown price includes `€` for Finnish locale and `SEK` for Swedish locale

### Requirement: Cart page layout SHALL be split by viewport size
The system SHALL present cart items and summary in a two-column arrangement on larger screens and a stacked arrangement on mobile screens.

#### Scenario: Desktop shows items left and summary right
- **WHEN** cart page is viewed on desktop viewport
- **THEN** line items are rendered in the left content column and order summary is rendered in the right column

#### Scenario: Mobile shows items above summary
- **WHEN** cart page is viewed on mobile viewport
- **THEN** line items are rendered first and summary is rendered below them

