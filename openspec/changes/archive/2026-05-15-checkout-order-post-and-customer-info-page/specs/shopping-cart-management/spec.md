## ADDED Requirements

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
