## ADDED Requirements

### Requirement: Cart SHALL show structured order summary fields
The system SHALL display a cart order summary section with all required labels and values before checkout.

#### Scenario: Summary fields are visible
- **WHEN** cart page is rendered with one or more items
- **THEN** summary shows `Tilausyhteenveto`, `Välisumma`, `ALV (sisältyy hintaan)`, `Toimitus`, `Yhteensä`, and `Yhteensä (ei ALV)`

#### Scenario: Delivery row uses hard-coded placeholder
- **WHEN** summary renders delivery row
- **THEN** the value for `Toimitus` is shown as `Lasketaan kassalla`

### Requirement: Cart SHALL expose checkout continuation action in summary
The system SHALL display a checkout continuation button in the summary section.

#### Scenario: Summary shows checkout CTA
- **WHEN** cart summary is displayed
- **THEN** a button labeled `Jatka kassalle` is rendered after summary totals
