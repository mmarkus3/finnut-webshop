## 1. Delivery Method Persistence Flow

- [x] 1.1 Add checkout handler to update active order with selected delivery method id.
- [x] 1.2 Integrate order service update call carrying `deliveryMethod` value.
- [x] 1.3 Guard for missing active order id and prevent duplicate in-flight save actions.

## 2. UX Feedback

- [x] 2.1 Show loading state while selected delivery method is being saved.
- [x] 2.2 Show error feedback and allow retry when delivery method save fails.

## 3. Verification

- [x] 3.1 Add tests for payload/update invocation with selected method id.
- [x] 3.2 Add tests for success path (selection persisted).
- [x] 3.3 Add tests for failure path and retry behavior.
