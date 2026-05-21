## 1. Success Page Route

- [x] 1.1 Add a `/payment/success` Expo Router page.
- [x] 1.2 Render title "Kiitos tilauksestanne" and body "Tilauksenne on vastaanotettu ja käsitellään mahdollisimman pian".
- [x] 1.3 Ensure provider query parameters are tolerated and do not block rendering.

## 2. Cart And Navigation Behavior

- [x] 2.1 Clear the cart when the payment success page loads.
- [x] 2.2 Add a button that navigates to the home page `/`.
- [x] 2.3 Add or update localized strings if the page uses i18next.

## 3. Verification

- [x] 3.1 Add tests for success message rendering with provider query parameters.
- [x] 3.2 Add tests that cart clearing is invoked on page load.
- [x] 3.3 Add tests that the home button navigates to `/`.
- [x] 3.4 Run relevant Jest tests for the payment success page.
