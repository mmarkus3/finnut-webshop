## Why

Checkout currently renders customer info and summary in a single flow, which is less scannable on large screens. A responsive split layout improves readability while keeping mobile flow straightforward.

## What Changes

- Add responsive checkout layout behavior:
  - Desktop: customer information section on the left, order summary on the right.
  - Mobile: customer information section on top, summary below.
- Keep existing checkout content and summary values unchanged.
- Add/update tests to verify layout behavior across breakpoints.

## Capabilities

### New Capabilities
- `checkout-responsive-layout`: Defines breakpoint-based arrangement of checkout customer and summary sections.

### Modified Capabilities
- `checkout-customer-information-page`: Checkout page layout requirements are expanded with desktop/mobile positioning rules.

## Impact

- Affected code: `components/checkout/CheckoutPage.tsx` and related layout helpers/constants.
- Testing: checkout page tests updated with layout assertions for desktop and mobile.
- No backend or API changes.
