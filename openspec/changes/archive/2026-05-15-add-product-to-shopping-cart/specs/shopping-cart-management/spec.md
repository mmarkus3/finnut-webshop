## ADDED Requirements

### Requirement: Add Product To Cart
The system SHALL allow users to add a product to the shopping cart from product browsing and product detail surfaces.

#### Scenario: Add product from product card
- **WHEN** the user activates an add-to-cart action on a product card
- **THEN** the system adds that product to the cart with quantity incremented by one

#### Scenario: Add product from product detail page
- **WHEN** the user activates an add-to-cart action on product detail page
- **THEN** the system adds that product to the cart with quantity incremented by one

### Requirement: Cart Quantity Management
The system SHALL allow users to adjust quantities and remove products from cart line items.

#### Scenario: Increase line item quantity
- **WHEN** the user increases quantity for a cart line item
- **THEN** the system updates that line item quantity by one within allowed stock bounds

#### Scenario: Decrease line item quantity
- **WHEN** the user decreases quantity for a cart line item with quantity above one
- **THEN** the system updates that line item quantity by one

#### Scenario: Remove line item
- **WHEN** the user removes a cart line item
- **THEN** the system removes that product from the cart

### Requirement: Header Cart Status
The system SHALL expose cart item count status in the header cart action.

#### Scenario: Header reflects cart count
- **WHEN** cart content changes
- **THEN** the header cart action reflects the updated item count

### Requirement: Dedicated Cart Review Page
The system SHALL provide a cart page that lists current cart items, quantity controls, and total summary.

#### Scenario: Open cart page from header
- **WHEN** the user activates the header cart action
- **THEN** the system navigates to the dedicated cart page

#### Scenario: Show empty cart state
- **WHEN** the cart has no items
- **THEN** the cart page displays a localized empty-cart message

#### Scenario: Show cart total
- **WHEN** the cart contains items with available prices
- **THEN** the cart page displays a localized total price summary based on line item quantities

### Requirement: Cart Localization
The system MUST localize all new shopping cart UI text via i18next resources.

#### Scenario: Render localized cart text
- **WHEN** the active locale changes
- **THEN** cart labels, actions, and empty states render in the selected locale
