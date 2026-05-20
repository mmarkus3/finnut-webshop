## Why

Webshop behavior should adapt by deployment country without manual runtime configuration. Country-specific defaults are needed so Sweden deployments start in Swedish and product requests include the correct country context for SEK pricing.

## What Changes

- Introduce country resolution from `EXPO_PUBLIC_COUNTRY` with default fallback to `FI`.
- If resolved country is `SE`, initialize app language to Swedish by default.
- Pass resolved country as query parameter in product fetching requests.
- Keep existing Finnish defaults when country is missing or unsupported.

## Capabilities

### New Capabilities
- `country-aware-localization-and-pricing-context`: Runtime country configuration drives initial language and product fetch country parameter.

### Modified Capabilities
- `product-catalog-fetching`: Product fetch request requirements are extended to include `country` query parameter resolved from environment.
- `localization-runtime-defaults`: Initial language default requirements are extended to support Swedish default for Sweden deployments.

## Impact

- Affected code includes env/config helpers, i18n startup/default language selection, and product-fetch hooks/services.
- Tests needed for country resolution fallback and request parameter behavior.
- No backend endpoint change required beyond existing query support.
