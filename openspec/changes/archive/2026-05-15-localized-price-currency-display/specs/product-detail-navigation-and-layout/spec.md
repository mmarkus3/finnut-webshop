## ADDED Requirements

### Requirement: Product detail price SHALL include localized currency
The system SHALL display product detail page price values with locale-specific currency markers.

#### Scenario: Product detail price includes locale currency
- **WHEN** a product detail page renders a price field
- **THEN** the price text includes `€` for Finnish locale and `SEK` for Swedish locale
