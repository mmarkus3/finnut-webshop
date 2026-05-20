## Context

The current implementation applies one discount percentage globally across cart items. Campaign payload now carries discount metadata per product, and we already have campaign interfaces available. The calculation layer should derive a productId->discount mapping from typed campaign data and apply discounts selectively.

## Goals / Non-Goals

**Goals:**
- Use campaign interface types as source for discount extraction.
- Compute discounted prices per line item based on matching product-level discount.
- Preserve current UX structure (show original + discounted price) while correcting math.

**Non-Goals:**
- Campaign creation/edit workflows.
- Multiple stacked campaign code handling.
- Backend schema changes.

## Decisions

- Introduce typed helper to resolve discount percentage by product identifier from campaign structure.
Rationale: isolates campaign-shape parsing and protects pricing helpers from schema churn.

- Update discount pricing helpers to accept product-specific discount percentage per line rather than one global percentage.
Rationale: aligns logic with product-level campaign semantics.

- Match products by normalized product identifiers already used in cart/order mapping.
Rationale: keeps consistency with existing `getProductIdentifier` behavior.

- Keep fallback behavior explicit: missing product entry means no discount for that item.
Rationale: avoids unintended global discounting.

## Risks / Trade-offs

- [Risk] Product identifier mismatch between campaign payload and cart product ids/ean. → Mitigation: normalize identifiers and add tests for id/ean fallback matching.
- [Risk] Partial campaign data could silently skip discounts. → Mitigation: add defensive null checks and test mixed validity payloads.
- [Risk] Existing tests may mask rounding regressions with mixed discounts. → Mitigation: add line-level and totals tests for mixed discount/no-discount carts.
