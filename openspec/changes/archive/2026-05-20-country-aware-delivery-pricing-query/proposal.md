## Why

Delivery pricing must align with deployment country context, similar to product pricing behavior. Without country-aware query parameters, delivery pricing may return values for the wrong country.

## What Changes

- Add `country` query parameter to delivery pricing fetch requests.
- Resolve country from shared country config/env behavior (`EXPO_PUBLIC_COUNTRY`, fallback `FI`).
- Keep existing pricing normalization and fallback behavior unchanged.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `delivery-pricing-context`: Delivery pricing fetch requirements are updated to include resolved country query parameter.

## Impact

- Affected code includes delivery pricing fetch helper/provider and related tests.
- No UI layout changes are required.
- No backend endpoint change required beyond already-supported query parameters.
