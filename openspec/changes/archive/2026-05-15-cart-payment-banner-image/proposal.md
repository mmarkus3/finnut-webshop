## Why

Users may benefit from seeing accepted payment provider branding before proceeding to checkout. Adding the Visma Pay banner at the bottom of the cart page improves payment expectation clarity.

## What Changes

- Render payment banner image from `https://static.vismapay.com/pay_banners/row.png` at the bottom of cart page.
- Keep existing cart item and summary behavior unchanged.
- Ensure banner remains visible after cart content and summary on both desktop and mobile.
- Add accessibility label and test coverage for banner rendering.

## Capabilities

### New Capabilities
- `cart-payment-banner-display`: Defines payment banner rendering behavior on cart page.

### Modified Capabilities
- `cart-order-summary-breakdown`: Cart page footer area now includes payment banner element below summary content.

## Impact

- Affected code: `components/cart/CartPage.tsx` and related tests.
- Potential UI adjustments: spacing/margins at cart bottom to preserve clean layout.
- Testing: update cart page tests to verify banner presence.
