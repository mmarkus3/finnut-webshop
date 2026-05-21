## Why

The payment return page currently treats every provider return as a successful order and clears the cart. Visma Pay returns `RETURN_CODE`, so the page must distinguish successful payment from failed, unresolved, or maintenance returns before showing confirmation and clearing cart state.

## What Changes

- Read `RETURN_CODE` from `/payment/success` query parameters.
- Show success copy only when `RETURN_CODE=0`.
- Clear the cart only when `RETURN_CODE=0`.
- Show failure/status-specific user text for known non-success codes:
  - `1`: payment failed because the customer did not successfully finish payment.
  - `4`: transaction status could not be updated; merchant must resolve payment status.
  - `10`: maintenance break; transaction was not created.
- Preserve home navigation button behavior.
- Provide fallback text for missing or unknown `RETURN_CODE`.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `payment-success-return-page`: Payment return page SHALL render status-specific content according to `RETURN_CODE`.
- `cart-local-persistence`: Cart SHALL be cleared only for successful payment return code `0`.

## Impact

- Affected UI: `components/payment/PaymentSuccessPage.tsx`.
- Affected localization: add payment return status texts for success, failed, unresolved, maintenance, and unknown states.
- Affected cart behavior: `clearCart` becomes conditional on `RETURN_CODE=0`.
- Affected tests: payment return rendering and cart-clearing tests for success and non-success return codes.
