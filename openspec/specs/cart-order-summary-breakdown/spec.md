# cart-order-summary-breakdown Specification

## Purpose
TBD - created by archiving change cart-two-column-summary-and-checkout-cta. Update Purpose after archive.
## Requirements
### Requirement: Cart SHALL show structured order summary fields
The system SHALL display a cart order summary section with all required labels and values before checkout.

#### Scenario: Summary fields are visible
- **WHEN** cart page is rendered with one or more items
- **THEN** summary shows `Tilausyhteenveto`, `Välisumma`, `ALV (sisältyy hintaan)`, `Toimitus`, `Yhteensä`, and `Yhteensä (ei ALV)`

#### Scenario: Delivery row uses hard-coded placeholder
- **WHEN** summary renders delivery row
- **THEN** the value for `Toimitus` is shown as `Lasketaan kassalla`

### Requirement: Cart SHALL expose checkout continuation action in summary
The system SHALL display a checkout continuation button in the summary section.

#### Scenario: Summary shows checkout CTA
- **WHEN** cart summary is displayed
- **THEN** a button labeled `Jatka kassalle` is rendered after summary totals

### Requirement: Checkout CTA SHALL trigger backend order creation
The system SHALL create an order in backend when user proceeds from cart summary checkout action.

#### Scenario: Proceeding from cart creates order
- **WHEN** user presses `Jatka kassalle` in cart summary
- **THEN** the system posts an order object built from current cart contents to backend via OrdersService

### Requirement: Successful order creation SHALL navigate to checkout page
The system SHALL navigate user to checkout page only after order creation succeeds.

#### Scenario: Successful create leads to checkout
- **WHEN** backend order create request succeeds
- **THEN** user is navigated from cart page to checkout page

### Requirement: Checkout CTA SHALL navigate only after successful active-order sync
The system SHALL navigate to checkout only after create/update synchronization succeeds.

#### Scenario: Successful update then navigation
- **WHEN** active-order update request succeeds
- **THEN** system navigates from cart to checkout page with the active order context

### Requirement: Cart footer SHALL include payment provider image
The system SHALL include a payment provider image element beneath order summary and checkout controls.

#### Scenario: Footer image appears after summary and CTA
- **WHEN** cart summary and checkout button are shown
- **THEN** payment provider image is rendered below those elements in the cart page flow

### Requirement: Cart summary delivery cost SHALL use fetched threshold pricing
The system SHALL compute cart delivery row from fetched `over` and `delivery` values.

#### Scenario: Cart total below threshold shows delivery fee
- **WHEN** cart total is less than `over`
- **THEN** cart summary delivery row displays `delivery` price

#### Scenario: Cart total at or above threshold shows free delivery
- **WHEN** cart total is equal to or greater than `over`
- **THEN** cart summary delivery row indicates free delivery

