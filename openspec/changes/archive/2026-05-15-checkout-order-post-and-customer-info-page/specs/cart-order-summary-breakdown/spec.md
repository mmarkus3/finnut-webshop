## ADDED Requirements

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
