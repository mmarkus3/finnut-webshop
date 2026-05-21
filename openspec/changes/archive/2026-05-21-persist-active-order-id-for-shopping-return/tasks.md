## 1. Active Order Id Persistence

- [x] 1.1 Add local storage key/helpers for saving and reading active order id.
- [x] 1.2 Save active order id after successful backend order creation.
- [x] 1.3 Reuse stored active order id when user returns to checkout flow.

## 2. Fallback And Lifecycle Handling

- [x] 2.1 Add guards for invalid/missing stored order id.
- [x] 2.2 Define and wire clear behavior for active order id on completion/cancel path (or explicit TODO hook if completion not yet implemented).

## 3. Verification

- [x] 3.1 Add tests for save/load/clear active order id helpers.
- [x] 3.2 Add tests for resume behavior when proceeding to checkout after returning to shopping.
- [x] 3.3 Add tests for invalid stored id fallback path.
