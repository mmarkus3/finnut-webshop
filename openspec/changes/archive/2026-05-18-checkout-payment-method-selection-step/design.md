## Context

Checkout already collects customer details, retrieves delivery points, and persists selected delivery method to active order. The missing piece is proceeding to a payment-method selection step. The new step must keep summary parity with the previous checkout step and fetch payment methods from company-scoped backend endpoint.

## Goals / Non-Goals

**Goals:**
- Add explicit step progression from customer+delivery step to payment-method step.
- Gate progression until required information is complete (customer info + delivery method selected).
- Fetch and display payment methods from `/orders/company/${process.env.EXPO_PUBLIC_COMPANY}/paymentMethods`.
- Reuse the same order summary presentation semantics on payment step.

**Non-Goals:**
- Finalizing payment transaction flow with external provider.
- Reworking existing cart summary calculations.
- Introducing new checkout backend endpoints beyond payment methods fetch.

## Decisions

- Implement payment selection as a dedicated checkout sub-step/page rather than embedding in same panel.
Rationale: clearer progression, simpler state separation, and easier testing.

- Reuse existing summary component/pattern from checkout customer step.
Rationale: keeps visual consistency and avoids duplicated pricing logic divergence.

- Use explicit completion guard for moving to payment step.
Rationale: ensures required checkout data exists before payment selection.

- Add robust fetch-state UX (loading/empty/error) for payment methods.
Rationale: endpoint dependency requires user feedback and retry path.

## Risks / Trade-offs

- [Risk] Step-state could desync if user returns and edits delivery/customer data. -> Mitigation: recompute step eligibility from source state each render/navigation.
- [Risk] Backend payment-method payload may vary. -> Mitigation: tolerant rendering with minimal required fields and tests around fallback display.
- [Trade-off] Additional step increases checkout clicks. -> Mitigation: maintain clear CTA and preserved summary context to reduce friction.
