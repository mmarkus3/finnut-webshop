## Context

Checkout now saves `returnUrl` as `{host}/payment/success`, so the app needs an Expo Router page at that path to receive the payment provider redirect. The provider can append query parameters, but this change only needs to show a static success confirmation, clear local cart state, and let the user return home.

## Goals / Non-Goals

**Goals:**

- Add a `/payment/success` route that renders after redirects with provider query parameters.
- Show the requested Finnish title and body copy.
- Provide a button that navigates to `/`.
- Clear the local cart when the page is reached.
- Cover rendering, cart clearing, query-param tolerance, and home navigation with focused Jest tests.

**Non-Goals:**

- Validating `AUTHCODE`, `RETURN_CODE`, `ORDER_NUMBER`, or `SETTLED`.
- Calling backend APIs to confirm or mutate payment/order status.
- Showing order details from query parameters.
- Changing the payment provider redirect URL format.

## Decisions

- Implement the page as `app/payment/success/index.tsx` to map directly to `/payment/success`.
- Use `useLocalSearchParams` only to tolerate the query string and ensure rendering does not depend on exact provider keys.
- Call `useCart().clearCart()` inside a mount effect so cart cleanup happens when the success page loads.
- Use `useRouter().push('/')` or `replace('/')` for the home button; either keeps the button behavior direct and in existing Expo Router patterns.
- Keep display strings as i18next keys under `paymentSuccess` unless implementation tests favor literal strings; Finnish values must match the requested copy exactly.

## Risks / Trade-offs

- The success page may be revisited manually -> clearing an already-empty cart is idempotent and safe.
- Clearing cart before backend payment verification could hide cart contents on a spoofed success URL -> this follows the requested behavior and does not add payment validation in this scope.
- Provider query params can vary -> the page must not require specific query params to render the success message.
