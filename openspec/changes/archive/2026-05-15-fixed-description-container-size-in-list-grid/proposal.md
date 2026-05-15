## Why

Description text lengths vary between products, causing uneven card heights and visual jitter in list/grid layouts. A fixed-size description container keeps cards aligned and improves scanability.

## What Changes

- Enforce a consistent description container height on product cards in home list and category grid views.
- Keep existing description truncation behavior while reserving equal vertical space.
- Preserve existing product metadata and interaction behavior.
- Add/extend tests to verify fixed description container sizing behavior.

## Capabilities

### New Capabilities
- `fixed-description-container-in-cards`: Product card description area uses a consistent fixed vertical size in list/grid surfaces.

### Modified Capabilities
- `homepage-category-product-sections`: Home product card description block sizing is normalized to fixed container height.
- `category-page-product-grid`: Category grid product card description block sizing is normalized to fixed container height.

## Impact

- Affected areas: home and category card layout classes for description section.
- Data/API impact: none.
- Dependencies: existing card rendering tests and UI class conventions.
