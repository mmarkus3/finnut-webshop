## ADDED Requirements

### Requirement: Cart price values SHALL include localized currency
The system SHALL display cart line-item price, VAT summary value, and total summary value with locale-specific currency markers.

#### Scenario: Cart values include locale currency
- **WHEN** the cart page renders line-item and summary price values
- **THEN** each shown price includes `€` for Finnish locale and `SEK` for Swedish locale
