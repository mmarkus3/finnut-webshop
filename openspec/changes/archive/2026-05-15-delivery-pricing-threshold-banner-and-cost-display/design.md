## Context

Current cart and checkout use a static delivery placeholder, and no global delivery-threshold messaging is shown. Delivery pricing endpoint now provides threshold (`over`) and delivery fee (`delivery`) to enable dynamic behavior.

## Goals / Non-Goals

**Goals:**
- Load delivery pricing early and make it available app-wide.
- Display threshold banner under header across pages.
- Compute delivery cost in cart/checkout based on `over` threshold and cart total.

**Non-Goals:**
- No backend changes.
- No multi-tier or region-based delivery rules beyond provided fields.

## Decisions

- Add delivery pricing fetch helper + hook with cached state and loading/error resilience.
- Trigger pricing fetch in root layout (or provider) so data becomes available early.
- Use currency formatter already in app for display values.
- In cart/checkout:
  - `total >= over` => show free delivery text/value.
  - `total < over` => show numeric `delivery` cost.
- If pricing unavailable, show graceful fallback placeholder/state.

## Risks / Trade-offs

- [Risk] Endpoint unavailable during session start. -> Mitigation: fallback messaging and lazy retry.
- [Risk] Banner visibility may increase header height and affect layout. -> Mitigation: consistent spacing and responsive header container.
