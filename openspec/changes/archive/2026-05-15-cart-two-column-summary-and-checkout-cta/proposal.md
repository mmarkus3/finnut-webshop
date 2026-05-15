## Why

The current cart page does not separate item management from order totals clearly, and key checkout summary fields are missing. A structured summary panel is needed now to improve checkout clarity and prepare for a full checkout flow.

## What Changes

- Change cart page layout to two columns on larger screens: items on the left and summary on the right.
- Keep mobile cart flow vertical: products first, summary second.
- Expand summary panel content with requested fields and labels:
  - `Tilausyhteenveto`
  - `Välisumma`
  - `ALV (sisältyy hintaan)`
  - `Toimitus` with hard-coded value `Lasketaan kassalla`
  - divider
  - `Yhteensä`
  - `Yhteensä (ei ALV)`
  - button `Jatka kassalle`
- Preserve existing cart quantity controls and currency formatting while adding summary rows.

## Capabilities

### New Capabilities
- `cart-order-summary-breakdown`: Defines structured order summary fields and CTA requirements for cart page.

### Modified Capabilities
- `cart-image-and-vat-breakdown`: Cart page layout and summary section requirements are expanded for desktop/mobile arrangement and additional summary rows.

## Impact

- Affected code: `components/cart/CartPage.tsx`, cart summary rendering helpers, i18n translation keys, and cart page tests.
- Testing: update cart component tests for responsive structure and newly required summary labels/values.
- No API, backend, or data model changes.
