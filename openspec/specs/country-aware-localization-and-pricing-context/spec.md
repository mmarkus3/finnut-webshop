# country-aware-localization-and-pricing-context Specification

## Purpose
TBD - created by archiving change country-env-drives-language-and-product-country-query. Update Purpose after archive.
## Requirements
### Requirement: Country Environment Resolution
The system SHALL resolve webshop country from `EXPO_PUBLIC_COUNTRY` and SHALL fallback to `FI` when missing or invalid.

#### Scenario: Country env is set to SE
- **WHEN** `EXPO_PUBLIC_COUNTRY` is `SE`
- **THEN** resolved webshop country is `SE`

#### Scenario: Country env is missing or unsupported
- **WHEN** `EXPO_PUBLIC_COUNTRY` is empty, missing, or unsupported
- **THEN** resolved webshop country is `FI`

### Requirement: Country-Driven Default Language
The system SHALL set default language to Swedish when resolved country is `SE`.

#### Scenario: Sweden deployment default language
- **WHEN** resolved webshop country is `SE`
- **THEN** initial/default app language is Swedish

#### Scenario: Finland deployment default language
- **WHEN** resolved webshop country is `FI`
- **THEN** default app language remains Finnish behavior

