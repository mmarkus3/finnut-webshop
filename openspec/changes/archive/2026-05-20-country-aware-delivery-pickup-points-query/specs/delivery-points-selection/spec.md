## ADDED Requirements

### Requirement: Delivery Pickup Points Request Includes Country Query Parameter
Delivery pickup points fetch requests SHALL include resolved webshop country as `country` query parameter.

#### Scenario: Sweden country includes SE in pickup points request
- **WHEN** resolved webshop country is `SE`
- **THEN** pickup points request includes query params `postalCode=<value>` and `country=SE`

#### Scenario: Missing/invalid env falls back to FI in pickup points request
- **WHEN** country env is missing or invalid and fallback resolves to `FI`
- **THEN** pickup points request includes query params `postalCode=<value>` and `country=FI`
