## Why

On small screens, home category product lists may not provide a reliable scrolling experience, which limits product discoverability and usability. Ensuring smooth, intentional scrolling on smaller viewports improves browsing and conversion.

## What Changes

- Ensure home page category product rows are scrollable on small screens.
- Preserve existing desktop behavior while optimizing mobile/small-screen interaction.
- Improve touch/gesture behavior and spacing so cards are easy to browse horizontally.
- Add/extend tests to verify small-screen scrollability behavior.

## Capabilities

### New Capabilities
- `home-small-screen-category-scroll`: Reliable horizontal scrolling for category product rows on small screens.

### Modified Capabilities
- `homepage-category-product-sections`: Category product section interaction behavior updated to guarantee small-screen scrollability.

## Impact

- Affected areas: home category product section layout and scrolling container behavior.
- Data/API impact: none.
- Dependencies: existing home category section component and Jest tests.
