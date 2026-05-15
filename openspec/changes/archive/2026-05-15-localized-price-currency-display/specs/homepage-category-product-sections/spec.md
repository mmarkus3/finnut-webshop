## ADDED Requirements

### Requirement: Home product card price SHALL include localized currency
The system SHALL display home category product card prices with locale-specific currency markers.

#### Scenario: Home card price includes locale currency
- **WHEN** a home category product card renders a price
- **THEN** the price text includes `€` for Finnish locale and `SEK` for Swedish locale
