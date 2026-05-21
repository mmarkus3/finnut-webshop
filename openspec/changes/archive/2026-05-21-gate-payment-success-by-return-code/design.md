## Context

`PaymentSuccessPage` currently calls `clearCart()` when it mounts and always renders success copy. Provider redirects include `RETURN_CODE`, where `0` means payment completed successfully and non-zero values represent failure, unresolved status, or maintenance. The page should become a payment return status page while keeping the existing `/payment/success` route and home navigation.

## Goals / Non-Goals

**Goals:**

- Read `RETURN_CODE` from `useLocalSearchParams()`.
- Map known codes `0`, `1`, `4`, and `10` to user-facing titles and body texts.
- Clear cart only when `RETURN_CODE` is exactly `0`.
- Keep cart intact for `1`, `4`, `10`, missing, and unknown return codes.
- Keep home navigation button available for every status.

**Non-Goals:**

- Calling backend APIs to verify or resolve payment status.
- Updating order state based on return code.
- Showing provider technical details such as `AUTHCODE` or `ORDER_NUMBER`.
- Changing the payment provider return URL.

## Decisions

- Normalize `RETURN_CODE` from Expo Router search params by accepting either a string or first string in an array.
- Add a small local status mapping helper in the payment success component or adjacent module to keep rendering deterministic and testable.
- Use i18next keys for status text, keeping the existing success title/body values unchanged for `RETURN_CODE=0`.
- Keep `useEffect` for cart clearing but guard it with `returnCode === '0'`.

## Risks / Trade-offs

- Query param may be missing or malformed -> render an unknown-status message and keep the cart.
- Return code `4` may require merchant action -> show a clear unresolved-status message without clearing customer cart locally.
- Users may retry after failure -> keeping the cart for non-success return codes preserves their items.
