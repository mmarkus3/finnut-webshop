## Why

Payment methods returned by the checkout endpoint include image URLs, but the checkout payment-method list currently renders only text. Showing the payment method image makes options easier to recognize and aligns the checkout UI with the branded payment choices users expect.

## What Changes

- Display each payment method's returned image in the selectable payment-method list when an image URL is available.
- Keep payment method selection, loading, empty, and error behavior unchanged.
- Preserve an accessible text label for each option so image display does not replace the method name.
- Ensure list layout remains stable when an image is missing or fails to load.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `checkout-payment-method-selection`: Payment-method options SHALL include the returned payment method image when available.

## Impact

- Affected code: `components/checkout/CheckoutPage.tsx` payment-method list rendering and potentially `hooks/paymentMethods.ts` tests around normalized image data.
- Affected tests: checkout payment-step rendering tests and payment-method helper tests.
- APIs/dependencies: no endpoint or dependency changes expected; uses existing `img` data returned by `/orders/company/${process.env.EXPO_PUBLIC_COMPANY}/paymentMethods`.
