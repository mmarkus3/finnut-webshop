## ADDED Requirements

### Requirement: System SHALL provide an unlinked order details page addressed by order ID
The system SHALL provide an order details page at `/order` whose order context is selected from an `orderId` query parameter and SHALL not add navigation links that expose the page as a browsable order-history surface.

#### Scenario: Visitor opens a direct order URL
- **WHEN** a visitor opens `/order?orderId=order-123`
- **THEN** the system renders the order details experience for order `order-123`
- **AND** the page is reachable through its URL without requiring navigation from another webshop page

#### Scenario: Order ID is absent
- **WHEN** a visitor opens `/order` without a valid `orderId` query parameter
- **THEN** the system displays a missing-order-information state
- **AND** the system does not attempt to fetch an order without an ID

### Requirement: Order details page SHALL retrieve the requested order through OrdersService
The system SHALL fetch order details by calling the existing company-scoped `OrdersService.get` operation using the requested order ID.

#### Scenario: Order details request succeeds
- **WHEN** the order details page receives order ID `order-123`
- **THEN** the system requests order `order-123` from the configured company orders service
- **AND** the returned order data is used to render the details view

#### Scenario: Order details request is in progress or fails
- **WHEN** an order retrieval is pending or cannot be completed
- **THEN** the system displays an appropriate loading or retrieval-error state
- **AND** it does not present stale order details as the requested order

### Requirement: Order details page SHALL show an order-status timeline
The system SHALL display the order ID and the ordered lifecycle statuses `draft`, `pending`, `placed`, and `sent` as a status timeline.

#### Scenario: Current status distinguishes previous and future steps
- **WHEN** the fetched order status is `placed`
- **THEN** the `placed` timeline step is displayed in green as the current state
- **AND** `draft` and `pending` are displayed in light green as completed previous states
- **AND** `sent` is displayed in gray as a future state

#### Scenario: Unknown returned status is not shown as completed progress
- **WHEN** the fetched order does not map to a recognized timeline status
- **THEN** the page displays an unknown-status representation
- **AND** no future completion state is incorrectly marked as current or completed

### Requirement: Order details page SHALL show ordered products and order sum
The system SHALL show each returned ordered product's name, amount, and stored final price and SHALL show a localized total order sum derived from the ordered product lines.

#### Scenario: Products and total are displayed from the order
- **WHEN** a fetched order contains products with final prices
- **THEN** the page displays each product name, amount, and localized final price
- **AND** the displayed total equals the sum of each product amount multiplied by its final price

#### Scenario: Required product price is unavailable
- **WHEN** a returned order product does not contain a final price needed for the total
- **THEN** the page presents unavailable-price information for that line or total
- **AND** it does not display an invented order sum

### Requirement: Order details page SHALL show stored customer information
The system SHALL show the customer information stored on the fetched order.

#### Scenario: Customer information is available
- **WHEN** the fetched order contains customer information
- **THEN** the page displays first name, last name, email, phone number, street address, postal code, and city from that order

#### Scenario: Customer information is unavailable
- **WHEN** the fetched order does not contain customer information
- **THEN** the page displays that customer information is unavailable
- **AND** it does not substitute data from local checkout state

### Requirement: Order details content SHALL follow supported localization
The system SHALL provide order-details page labels and states in Finnish, English, and Swedish and SHALL format returned prices using the application's active locale behavior.

#### Scenario: Order page displays localized content
- **WHEN** the active application language is Finnish, English, or Swedish
- **THEN** the order-details headings, timeline labels, summary labels, customer labels, and state messages are displayed in that language
- **AND** final prices and the order total use the locale's configured currency presentation
