## Context

Checkout currently keeps customer information in component state and saves a delivery point through `saveDeliveryMethodToOrder(orderId, pointId)`. The helper patches only `deliveryMethod`, which means the order can have a selected delivery method without the matching customer details that were required before the user could select it.

## Goals / Non-Goals

**Goals:**

- Persist customer information at the same time as selected delivery method.
- Reuse the existing `OrderCustomer` shape from `types/order.ts`.
- Keep delivery method save loading/error behavior unchanged.
- Keep the update as a single active order patch call.

**Non-Goals:**

- Changing customer form fields or validation rules.
- Creating a separate customer-save step.
- Changing order creation or discount synchronization behavior.
- Modifying backend endpoints or introducing new dependencies.

## Decisions

- Extend `saveDeliveryMethodToOrder` to accept an `OrderCustomer` argument and patch `{ deliveryMethod, customer }`.
- Pass the checkout component's current `customer` state when a delivery point is selected.
- Keep the existing guard that prevents delivery method save without `orderId`; customer persistence depends on the same active order.
- Update focused tests around the helper and checkout selection path rather than adding broad integration coverage.

## Risks / Trade-offs

- Customer state could be edited after delivery selection -> existing progression requires filled fields before delivery completion, and later edits can be handled by future explicit sync behavior if needed.
- Existing call sites may need updating -> currently checkout is the direct consumer; tests will catch stale call signatures.
- Backend may reject combined patch payload -> use the already supported order patch endpoint and keep error feedback under the existing delivery method save error path.
