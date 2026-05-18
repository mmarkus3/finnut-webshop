## ADDED Requirements

### Requirement: Product detail page SHALL allow selecting quantity before add-to-cart
The system SHALL provide quantity controls on product detail page so user can choose amount before adding product to cart.

#### Scenario: User selects quantity and adds in one action
- **WHEN** user selects quantity N on product detail and taps add-to-cart
- **THEN** cart receives N pieces for that product in one add action, respecting stock limits
