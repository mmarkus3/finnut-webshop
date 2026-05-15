## Context

The cart page already supports line items, VAT, and total with localized currency, but summary content is minimal and layout remains single-column. The requested UX introduces a stronger checkout-oriented structure: desktop split layout and a richer summary block with static delivery text for now.

## Goals / Non-Goals

**Goals:**
- Render cart items and summary in a two-column layout on larger screens.
- Keep mobile flow stacked with products before summary.
- Add all requested summary rows and checkout CTA text.
- Preserve existing cart interactions and accessibility behavior.

**Non-Goals:**
- No real delivery fee computation yet.
- No actual checkout navigation logic beyond rendering the CTA control.
- No backend checkout integration.

## Decisions

- Use responsive layout branching via viewport width (`useWindowDimensions`) in cart page.
  - Rationale: aligns with existing responsive patterns used elsewhere in app.
- Keep summary values derived from existing cart totals where applicable:
  - `Välisumma` from total price,
  - `ALV (sisältyy hintaan)` from VAT amount,
  - `Yhteensä` from total price,
  - `Yhteensä (ei ALV)` as `totalPrice - vatAmount` clamped to two decimals.
- Render delivery as static localized text (`Lasketaan kassalla`) for this phase.
- Add i18n keys for all new labels and button text, with Finnish-first wording from request.

## Risks / Trade-offs

- [Risk] Ambiguity between subtotal and total semantics when both are equal in current phase. -> Mitigation: keep labels explicit and revisit when delivery/discount logic is implemented.
- [Risk] CTA button without navigation may imply incomplete flow. -> Mitigation: render as presentational button now and wire behavior in a dedicated checkout change.
- [Trade-off] Responsive split may increase component complexity slightly but improves scanability and future extensibility.
