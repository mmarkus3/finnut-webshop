## Why

After entering customer details, users need a concrete delivery-point choice to complete checkout intent. Without selectable pickup points, checkout remains incomplete for delivery logistics.

## What Changes

- Extend checkout flow with delivery-point selection step after customer information entry.
- Fetch delivery points using GET against company-scoped endpoint:
  - `process.env.EXPO_PUBLIC_FIREBASE_API!`
  - ``/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/points?postalCode=xxxxx``
- Use entered postal code to query delivery points and show top 10 results in a selectable list.
- Persist selected delivery point in checkout state for order continuation.
- Add loading/error/empty states for delivery-point fetch.

## Capabilities

### New Capabilities
- `checkout-delivery-point-selection`: Defines fetch, display, and selection behavior for delivery points in checkout.

### Modified Capabilities
- `checkout-customer-information-page`: Checkout now includes delivery-point selection after customer data entry.
- `shopping-cart-management`: Checkout continuation now depends on selected delivery point state for delivery method completion.

## Impact

- Affected code: checkout page components/state, order service/network helper for points endpoint, related i18n keys.
- API usage: new GET request to `/orders/company/<company>/points` with postal code query.
- Testing: add tests for fetch invocation, top-10 rendering, selection behavior, and loading/error/empty states.
