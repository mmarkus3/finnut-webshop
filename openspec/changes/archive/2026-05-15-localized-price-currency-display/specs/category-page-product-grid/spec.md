## ADDED Requirements

### Requirement: Category grid price SHALL include localized currency
The system SHALL display category grid product prices with locale-specific currency markers.

#### Scenario: Category grid price includes locale currency
- **WHEN** a category page product card renders a price
- **THEN** the price text includes `€` for Finnish locale and `SEK` for Swedish locale
