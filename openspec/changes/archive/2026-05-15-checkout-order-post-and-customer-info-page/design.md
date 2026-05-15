## Context

Cart page already includes a visible "Jatka kassalle" button but it does not trigger checkout flow. The project already includes `OrdersService` and `Order` types, making backend order creation straightforward. No checkout route currently exists in app stack.

## Goals / Non-Goals

**Goals:**
- Create order from cart when checkout is initiated.
- Post order using the exact service endpoint pattern requested.
- Navigate to checkout page only after successful order creation.
- Show customer information form and cart-like summary on checkout page.

**Non-Goals:**
- Final payment processing.
- Full order update lifecycle after customer form submission.
- Authenticated customer account management.

## Decisions

- Add a checkout action handler in cart layer that:
  - maps cart items to `OrderProduct[]`,
  - creates `Order` with initial status (`draft` or `pending` per current domain choice),
  - calls `OrdersService.create(...)` (or equivalent RestService POST method).
- Introduce dedicated checkout route (`/checkout`) and register it in stack.
- Pass created order id and/or order payload to checkout page via route params or shared state hook.
- Reuse existing summary formatting helpers and currency logic to keep cart/checkout parity.
- Add disabled/loading state for checkout button while POST is in-flight and show recoverable error text on failure.

## Risks / Trade-offs

- [Risk] If network fails, user can’t continue to checkout. -> Mitigation: explicit error message and retry by keeping user on cart page.
- [Risk] Order model currently has limited fields; customer data may be entered only after initial order creation. -> Mitigation: allow checkout page to collect data for subsequent update flow.
- [Trade-off] Creating order before customer form ensures backend record exists early but may generate abandoned draft orders.
