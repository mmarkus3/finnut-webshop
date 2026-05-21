## Why

After a successful payment provider return, users need a clear confirmation screen and the local cart should no longer show purchased items. Adding `/payment/success` completes the return path already configured as the order `returnUrl`.

## What Changes

- Add a new Expo Router page at `/payment/success` that accepts provider query parameters such as `AUTHCODE`, `RETURN_CODE`, `ORDER_NUMBER`, and `SETTLED`.
- Render the title "Kiitos tilauksestanne" and body text "Tilauksenne on vastaanotettu ja käsitellään mahdollisimman pian".
- Add a button that navigates users back to the home page.
- Clear the local cart when the success page is reached.
- Preserve query parameters without requiring the page to validate or display them.

## Capabilities

### New Capabilities

- `payment-success-return-page`: Payment success return page behavior, confirmation content, home navigation, and cart clearing side effect.

### Modified Capabilities

- `cart-local-persistence`: Cart clearing SHALL occur when the payment success return page is reached.

## Impact

- Affected routing/UI: new `app/payment/success` route and likely a small page component.
- Affected cart state: `useCart().clearCart()` invoked on payment success page load.
- Affected localization: confirmation strings and home button text if implemented through i18next.
- Affected tests: page renders confirmation content, handles query parameters, navigates home, and clears cart.
