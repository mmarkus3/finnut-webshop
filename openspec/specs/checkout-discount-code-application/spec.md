# checkout-discount-code-application Specification

## Purpose
TBD - created by archiving change apply-discount-code-in-cart-and-checkout. Update Purpose after archive.
## Requirements
### Requirement: User Can Apply Discount Code During Cart/Checkout
The system SHALL allow the user to enter and apply a discount code during cart/checkout. The system MUST fetch campaign data from backend by the entered code before applying discount effects.

#### Scenario: Valid discount code is applied
- **WHEN** user submits a valid discount code in cart/checkout
- **THEN** system fetches campaign data for that code from backend
- **AND** system marks discount code as active for current checkout flow

#### Scenario: Invalid discount code is submitted
- **WHEN** user submits an invalid or unresolved discount code
- **THEN** system does not apply discount pricing
- **AND** system keeps totals based on non-discounted prices
- **AND** system exposes error state for UI feedback

### Requirement: Percentage Discount Price Calculation And Display
When active campaign discount is percentage-based, the system SHALL calculate discounted prices from original prices and SHALL display both original and discounted prices.

#### Scenario: Percentage discount updates line item display price
- **WHEN** active campaign contains percentage discount value
- **THEN** line-item discounted price is calculated from original line-item price using that percentage
- **AND** original line-item price remains visible alongside discounted price

#### Scenario: Percentage discount updates totals in summaries
- **WHEN** active campaign contains percentage discount value
- **THEN** cart/checkout summary totals use discounted prices
- **AND** summary retains original-to-discounted transparency where required by UI

### Requirement: Persist Discount Code To Order Payload
The system SHALL persist active discount code to `order.discount` and include it in order create and update requests.

#### Scenario: Discount code included when order is created
- **WHEN** user proceeds to create order with active discount code
- **THEN** create-order payload includes `discount` field with active code value

#### Scenario: Discount code included when existing order is updated
- **WHEN** existing active order is updated after discount code application or cart changes
- **THEN** update-order payload includes `discount` field with current active code value

### Requirement: Product-Level Campaign Discount Mapping
The system SHALL derive discount percentage from campaign product-level data using campaign interface types, and SHALL not assume one global campaign percentage.

#### Scenario: Campaign contains product-specific discount entries
- **WHEN** campaign data includes product-level `discountPercentage` values
- **THEN** system maps discount values by product identifier
- **AND** each cart/checkout line item uses its own mapped percentage if available

#### Scenario: Product is not present in campaign discount entries
- **WHEN** cart line item product has no matching campaign product-level entry
- **THEN** no discount is applied to that line item
- **AND** original pricing remains active for that line item

