# delivery-pricing-context Specification

## Purpose
TBD - created by archiving change country-aware-delivery-pricing-query. Update Purpose after archive.
## Requirements
### Requirement: Delivery Pricing Request Includes Country Query Parameter
Delivery pricing fetch requests SHALL include a `country` query parameter resolved from webshop country configuration.

#### Scenario: Sweden country adds SE query parameter
- **WHEN** resolved webshop country is `SE`
- **THEN** delivery pricing request includes `country=SE`

#### Scenario: Missing/invalid env falls back to FI query parameter
- **WHEN** country env is missing or invalid and resolver falls back to `FI`
- **THEN** delivery pricing request includes `country=FI`

