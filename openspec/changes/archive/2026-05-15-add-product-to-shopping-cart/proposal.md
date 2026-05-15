## Why

Users can browse and open products, but they currently cannot collect products for checkout in a shopping cart. Adding cart support is foundational for conversion because it enables users to build an order from multiple product pages.

## What Changes

- Add an "add to cart" action on product cards and product detail page.
- Add cart state management to store selected products and quantities.
- Add cart badge/count in header cart icon to reflect current cart quantity.
- Add a dedicated cart page to review items, adjust quantity, remove items, and view total price.
- Add localized i18next copy for cart actions, labels, and empty/error states.

## Capabilities

### New Capabilities
- `shopping-cart-management`: Add-to-cart, quantity management, cart summary, and cart page review flow.

### Modified Capabilities
- None.

## Impact

- Affected areas: product cards, product detail UI, header actions, navigation, and new cart page.
- Data impact: client-side cart state shape for line items and quantity.
- Dependencies: existing product metadata helpers, i18next resources, and Jest tests for cart behavior.
