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

