## ADDED Requirements

### Requirement: Product detail page SHALL display localized unit price per kilogram
The system SHALL display unit price per kilogram on product detail page when product data allows calculation.

#### Scenario: Unit price per kg is visible for calculable product
- **WHEN** product detail page renders a product with valid retail price and weight basis
- **THEN** unit price per kilogram is shown with localized currency formatting

#### Scenario: Unit price per kg is hidden for non-calculable product
- **WHEN** required inputs for unit-price calculation are missing or invalid
- **THEN** unit price per kilogram line is not displayed and page remains stable
