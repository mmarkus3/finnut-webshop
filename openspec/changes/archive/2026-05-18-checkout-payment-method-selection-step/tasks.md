## 1. Checkout Step Progression

- [x] 1.1 Add next-step navigation control on checkout customer/delivery step.
- [x] 1.2 Gate navigation so payment step is enabled only after required customer fields and delivery-method selection are complete.

## 2. Payment Method Step

- [x] 2.1 Create payment-method selection step/page with responsive layout (methods left, summary right on desktop).
- [x] 2.2 Fetch payment methods from `/orders/company/${process.env.EXPO_PUBLIC_COMPANY}/paymentMethods` using `process.env.EXPO_PUBLIC_FIREBASE_API`.
- [x] 2.3 Implement loading, empty, error states and payment-method selection UI.
- [x] 2.4 Reuse/show checkout summary semantics identical to previous step.

## 3. Verification

- [x] 3.1 Add/update tests for step-progression gating behavior.
- [x] 3.2 Add/update tests for payment-method fetch and state rendering (success/loading/error/empty).
- [x] 3.3 Add/update tests for payment-step summary parity and navigation flow.
