## Why

Users need a clear way to access general store/company information from anywhere in the webshop. Adding a persistent bottom area link improves discoverability and gives a consistent navigation path to an information page.

## What Changes

- Add a dedicated information page route with static informational content.
- Add a bottom link area visible on all pages.
- Style the bottom link area with the same background color as header area for visual consistency.
- Add localization keys for link label and information page content.
- Add tests for global link visibility and navigation to the information page.

## Capabilities

### New Capabilities
- `information-page-global-footer-link`: Provide a globally visible bottom link area that navigates to a dedicated information page.

### Modified Capabilities
- `delivery-pricing-fetch-and-threshold-messaging`: Ensure the new bottom link area coexists with existing global under-header delivery messaging without overlap/regression.

## Impact

- Affected layout: root app layout and shared page chrome.
- Affected navigation: new information page route.
- Affected i18n: new information page and link text keys.
- Affected tests: layout/navigation tests and/or relevant screen tests.
