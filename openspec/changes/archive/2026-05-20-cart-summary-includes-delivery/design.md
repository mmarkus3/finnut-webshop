## Context

Delivery pricing is already fetched and represented in cart/checkout summary. The summary currently displays delivery as a separate row and total as item subtotal only. We need to update the displayed final total to include delivery when delivery cost is known.

## Goals / Non-Goals

**Goals:**
- Compute final summary total as `items subtotal + delivery cost` when delivery cost is available and not free.
- Preserve free-delivery behavior where delivery contributes zero.
- Preserve placeholder/unknown delivery handling without forcing incorrect totals.

**Non-Goals:**
- Changing delivery pricing API contracts.
- Changing VAT logic beyond impact of total display aggregation.
- Changing order payload math in backend.

## Decisions

- Introduce/adjust helper-level calculation for summary final total based on subtotal + delivery cost.
Rationale: keeps UI consistent and testable.

- For `deliveryCost.cost === null`, keep final total based on subtotal only and continue showing delivery placeholder.
Rationale: avoids guessing unknown costs.

- Reuse this behavior in both cart and checkout summary views.
Rationale: prevents inconsistent totals between steps.

## Risks / Trade-offs

- [Risk] Confusion if placeholder delivery not included in total. → Mitigation: keep explicit delivery placeholder text and avoid implying included unknown cost.
- [Risk] Snapshot/test regressions in summary text values. → Mitigation: update affected tests with explicit expected totals.
