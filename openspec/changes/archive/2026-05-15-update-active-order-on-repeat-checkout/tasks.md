## 1. Create/Update Checkout Sync Flow

- [x] 1.1 Extend checkout action to branch between order create and active-order update.
- [x] 1.2 Reuse cart-to-order payload mapping for both create and update paths.
- [x] 1.3 Ensure checkout navigation happens only after successful create/update.

## 2. Error Handling

- [x] 2.1 Handle active-order update failures by showing error and staying on cart page.
- [x] 2.2 Add fallback behavior for invalid/not-found active order id (retry via create path or clear and recreate).

## 3. Verification

- [x] 3.1 Add tests for create path when no active order id exists.
- [x] 3.2 Add tests for update path when active order id exists.
- [x] 3.3 Add tests for update-failure behavior and navigation guard.
