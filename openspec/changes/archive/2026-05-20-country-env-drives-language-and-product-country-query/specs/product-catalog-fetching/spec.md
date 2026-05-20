## ADDED Requirements

### Requirement: Product Requests Include Country Query Parameter
Product catalog fetch requests SHALL include a `country` query parameter derived from resolved webshop country.

#### Scenario: Sweden request includes SE country parameter
- **WHEN** resolved webshop country is `SE`
- **THEN** product fetch request includes `country=SE`

#### Scenario: Default request includes FI country parameter
- **WHEN** country env is missing/invalid and fallback resolves to `FI`
- **THEN** product fetch request includes `country=FI`
