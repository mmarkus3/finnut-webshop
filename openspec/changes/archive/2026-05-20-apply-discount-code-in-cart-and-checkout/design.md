## Context

The app already has campaign lookup primitives and checkout order persistence flows. This change connects those pieces into cart/checkout UX and pricing math so discount codes affect displayed prices and order payload data consistently.

## Goals / Non-Goals

**Goals:**
- Allow user to submit discount code in cart/checkout.
- Resolve campaign by code from backend and apply discount to pricing.
- Show original and discounted prices in affected UI blocks.
- Persist selected discount code to `order.discount` on create/update.

**Non-Goals:**
- Complex promotion stacking or multiple simultaneous codes.
- Time-window validation logic beyond backend response handling.
- Backend-side discount computation redesign.

## Decisions

- Use existing campaign lookup hook/service as source of truth for campaign data.
Rationale: avoids duplicate fetch logic and keeps endpoint handling centralized.

- Introduce shared discount calculation helper that accepts original price and campaign discount model.
Rationale: ensures consistent discount math across line items and summaries.

- Keep original price available for rendering and totals comparison.
Rationale: UI requirement explicitly needs both original and discounted price visibility.

- Persist only discount code identifier to order payload (`order.discount`) while frontend computes display prices.
Rationale: aligns with requirement and keeps payload concise.

- Update order create and order update paths to always include current discount value if present.
Rationale: ensures refresh/re-entry and cart edits keep order discount in sync.

## Risks / Trade-offs

- [Risk] Rounding differences between frontend and backend totals. → Mitigation: centralize rounding strategy and add tests for percentage calculations.
- [Risk] Invalid/expired codes can leave stale discount state in UI. → Mitigation: clear active discount and show deterministic error state on failed lookup.
- [Risk] Applying discount late in checkout can desync order payload. → Mitigation: include discount in both create and update flows and update active order immediately when code changes.
