## 1. Return Code Handling

- [x] 1.1 Read and normalize `RETURN_CODE` from `useLocalSearchParams()`.
- [x] 1.2 Map return codes `0`, `1`, `4`, `10`, missing, and unknown values to user-facing payment status content.
- [x] 1.3 Keep provider query parameters tolerated without displaying technical query values.

## 2. Cart Clearing Behavior

- [x] 2.1 Clear cart only when normalized `RETURN_CODE` is `0`.
- [x] 2.2 Ensure non-success, missing, and unknown return codes do not clear cart.

## 3. Localization

- [x] 3.1 Add or update i18next keys for failed, unresolved, maintenance, and unknown payment return statuses.
- [x] 3.2 Preserve existing success title/body text for `RETURN_CODE=0`.

## 4. Verification

- [x] 4.1 Update payment success page tests for success code `0` rendering and cart clearing.
- [x] 4.2 Add tests for non-success return codes `1`, `4`, and `10`.
- [x] 4.3 Add tests for missing or unknown return code fallback.
- [x] 4.4 Run relevant Jest tests for the payment success page.
