## Context

The app already stores active order id locally and routes users back to checkout with that id. Current behavior can bypass backend sync when re-entering checkout, causing mismatch if cart changed between visits.

## Goals / Non-Goals

**Goals:**
- Update existing backend order using latest cart items when active order id exists.
- Preserve first-time checkout create behavior when no active order id exists.
- Navigate to checkout only after successful create/update operation.

**Non-Goals:**
- Diff-based selective patching of only changed order lines.
- Background auto-sync without user checkout action.

## Decisions

- Centralize payload mapping so both create and update paths use identical cart-to-order conversion.
- Use `OrdersService.save(order)` with `id` to trigger update path for active order.
- Treat active order id as authoritative for deciding update path; on update failure, keep user in cart with error.
- Keep loading/error UX shared across create/update flows.

## Risks / Trade-offs

- [Risk] Stale/invalid active order id may cause update errors. -> Mitigation: fallback to create flow when update reports not-found or invalid id.
- [Trade-off] Full order overwrite is simpler than line-level merge but may overwrite backend-side edits.
