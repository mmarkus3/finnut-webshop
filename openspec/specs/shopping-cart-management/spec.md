# shopping-cart-management Specification

## Purpose
TBD - created by archiving change cart-image-and-vat-summary. Update Purpose after archive.
## Requirements
### Requirement: VAT SHALL Be Calculated From Product Tax Decimal
The system SHALL calculate VAT contribution for each cart line item using `product.tax` as decimal percentage (for example `0.255`).

#### Scenario: VAT computed from decimal tax
- **WHEN** line item has unit price, quantity, and tax value `0.255`
- **THEN** VAT contribution is calculated as `unitPrice * quantity * 0.255`

#### Scenario: Missing tax value defaults to zero
- **WHEN** line item has no valid `product.tax`
- **THEN** VAT contribution for that line item is treated as `0`

### Requirement: Cart VAT Summary SHALL Aggregate Line Item VAT
The system SHALL aggregate VAT contributions from all cart line items into a single VAT summary value.

#### Scenario: Aggregated VAT shown in summary
- **WHEN** cart has multiple line items
- **THEN** summary VAT equals the sum of all line-item VAT contributions

### Requirement: Cart lifecycle SHALL preserve user selections across refresh
The system SHALL retain cart selections across app refresh by restoring persisted cart state.

#### Scenario: Refresh keeps prior cart items
- **WHEN** a user refreshes/reopens the app after previously adding cart items
- **THEN** the same cart items and quantities are shown after initialization completes

### Requirement: Cart items SHALL be mapped to order products for checkout create request
The system SHALL map cart line items into backend order product payload entries.

#### Scenario: Cart line item mapping to order payload
- **WHEN** checkout order payload is created from cart
- **THEN** each cart line item contributes an order product entry containing product identifier, product name, and quantity

### Requirement: Order create endpoint SHALL use company-scoped OrdersService route
The system SHALL instantiate OrdersService using configured Firebase API base URL and company-scoped orders route.

#### Scenario: OrdersService uses required route pattern
- **WHEN** checkout action initializes order communication service
- **THEN** service is created with `process.env.EXPO_PUBLIC_FIREBASE_API` and route `/orders/company/${process.env.EXPO_PUBLIC_COMPANY}`

### Requirement: Proceed-to-checkout flow SHALL branch between create and update paths
The system SHALL create order when no active order id exists and update order when active order id exists.

#### Scenario: No active order id uses create path
- **WHEN** user proceeds to checkout without stored active order id
- **THEN** system creates a new backend order from cart payload

#### Scenario: Active order id uses update path
- **WHEN** user proceeds to checkout with stored active order id
- **THEN** system updates that backend order using latest cart payload

### Requirement: Cart-to-checkout flow SHALL persist and reuse active order id
The system SHALL persist the created order id and reuse it for continued shopping-to-checkout transitions until cleared.

#### Scenario: Continued shopping keeps same order
- **WHEN** user starts checkout, returns to shopping, then proceeds again
- **THEN** the flow reuses the stored active order id for the in-progress order

### Requirement: Checkout continuation SHALL retain selected delivery point
The system SHALL keep selected delivery point in checkout state for subsequent order continuation.

#### Scenario: Selected point is retained in checkout session
- **WHEN** user selects a delivery point from results list
- **THEN** selected point remains associated with current checkout session until changed

### Requirement: Active order lifecycle SHALL include delivery method update stage
The system SHALL support updating active order delivery method after checkout order creation/update phase.

#### Scenario: Active order receives delivery method later in checkout
- **WHEN** active order already exists and delivery method is selected
- **THEN** active order is updated with delivery method id without creating a new order

### Requirement: Cart add action SHALL support multi-quantity payload
The system SHALL allow add-to-cart operation to add more than one piece in a single action.

#### Scenario: Adding multiple pieces in one action
- **WHEN** add-to-cart is invoked with quantity greater than 1
- **THEN** cart line quantity increases by the requested amount, capped by available stock

### Requirement: Cart Price Presentation Supports Discounted And Original Prices
The cart SHALL show discounted prices and original prices when a valid discount campaign is active.

#### Scenario: Cart row shows original and discounted price
- **WHEN** cart contains products and a valid discount is active
- **THEN** each affected cart row shows discounted price as active price
- **AND** each affected cart row shows original price as reference

#### Scenario: Cart summary uses discounted totals
- **WHEN** cart contains products and a valid discount is active
- **THEN** subtotal and total calculations use discounted line prices

### Requirement: Mixed Cart Discount Totals Use Product-Level Percentages
Cart summary totals SHALL apply discounts only for products that have product-level campaign discount percentages.

#### Scenario: Cart has both discounted and non-discounted products
- **WHEN** active campaign includes discount for subset of cart products
- **THEN** discounted subtotal is calculated from discounted lines plus unchanged non-discounted lines
- **AND** original subtotal remains available for comparison display

### Requirement: Cart Summary Total Includes Delivery Cost
The cart summary final total SHALL equal item subtotal plus delivery cost when delivery cost is available.

#### Scenario: Delivery cost is available and not free
- **WHEN** cart subtotal is known and delivery cost is a finite non-zero value
- **THEN** summary total is calculated as `subtotal + delivery cost`

#### Scenario: Delivery is free
- **WHEN** delivery state is free and delivery cost is zero
- **THEN** summary total equals subtotal

#### Scenario: Delivery cost is unknown
- **WHEN** delivery cost is not yet available and placeholder is shown
- **THEN** summary total remains based on subtotal only
- **AND** delivery row continues showing placeholder text

### Requirement: Cart And Checkout Totals Reflect Fixed Discount Prices
Cart and checkout summary calculations SHALL incorporate product-level fixed discounted prices when present.

#### Scenario: Mixed fixed-discount and regular products in cart
- **WHEN** cart contains products with fixed campaign discounts and products without discounts
- **THEN** discounted subtotal and total are calculated using fixed discounted prices for matching products and original prices for others
- **AND** summary display remains consistent with line-item displayed prices
