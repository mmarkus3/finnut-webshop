## 1. Shared Helper Extraction

- [x] 1.1 Create common HTTP helper module that contains axios imports and request execution utilities.
- [x] 1.2 Ensure helper supports current GET use cases (base URL + route + params).

## 2. Hook Refactors

- [x] 2.1 Refactor `hooks/deliveryPoints.ts` to remove axios imports and use shared helper.
- [x] 2.2 Refactor `hooks/deliveryPricing.tsx` to remove axios imports and use shared helper.
- [x] 2.3 Refactor `hooks/paymentMethods.ts` to remove axios imports and use shared helper.

## 3. Verification

- [x] 3.1 Update/add tests for affected hooks to ensure endpoint and response behavior remain unchanged.
- [x] 3.2 Verify no direct axios imports remain in refactored hooks.
