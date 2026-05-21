## Context

Order creation and checkout flow are being introduced, but without local order-id persistence users may create new draft orders repeatedly. A lightweight local key for active order id enables resume behavior while keeping server contracts unchanged.

## Goals / Non-Goals

**Goals:**
- Persist active order id after successful create.
- Restore active order id when user returns to checkout.
- Handle invalid/missing storage value safely.

**Non-Goals:**
- Multi-device synchronization.
- Automatic backend cleanup of abandoned orders.

## Decisions

- Introduce dedicated local storage key for active order id.
- Save value only on successful order creation response.
- Read stored id before creating a new order; reuse when valid for resume path.
- Clear stored id when order is finalized or explicitly abandoned (hook for future flow).

## Risks / Trade-offs

- [Risk] Stale order ids can accumulate if never cleared. -> Mitigation: clear on completion/cancel flows and validate on load.
- [Trade-off] Local-only resume improves UX quickly but does not cover cross-device continuity.
