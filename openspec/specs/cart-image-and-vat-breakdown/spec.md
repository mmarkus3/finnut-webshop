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

