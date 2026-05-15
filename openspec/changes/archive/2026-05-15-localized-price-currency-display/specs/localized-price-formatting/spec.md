## ADDED Requirements

### Requirement: Price formatting SHALL use locale-specific currency
The system SHALL format displayed prices using locale-aware currency markers so users can identify the correct market currency.

#### Scenario: Finnish locale uses euro symbol
- **WHEN** the active application locale is Finnish (`fi`) and a price is shown
- **THEN** the displayed price includes the euro currency marker (`€`)

#### Scenario: Swedish locale uses SEK marker
- **WHEN** the active application locale is Swedish (`sv`) and a price is shown
- **THEN** the displayed price includes the Swedish krona marker (`SEK`)

### Requirement: Currency formatting SHALL be consistent across price surfaces
The system SHALL use a shared formatting rule for all product and cart price strings.

#### Scenario: Price surfaces share one formatting behavior
- **WHEN** prices are rendered on home, category, product detail, search, and cart surfaces
- **THEN** each surface uses the same locale-to-currency mapping and decimal precision behavior
