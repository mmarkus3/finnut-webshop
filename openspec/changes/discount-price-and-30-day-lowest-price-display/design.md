## Context

The webshop currently displays regular product prices in listing and product detail views. Backend now returns additional pricing fields for discounted products. We need a consistent and clear rendering model across views while preserving current behavior for non-discounted products.

## Goals / Non-Goals

**Goals:**
- Show discount pricing state consistently in listing and product detail views.
- Clearly differentiate `discountPrice` and original `retailPrice` visually.
- Show `lowestRetailPriceLast30Days` text when `discountPrice` exists.
- Keep localization-ready labeling for the 30-day lowest price text.

**Non-Goals:**
- Backend API schema changes.
- Campaign logic (start/end dates, badge management) beyond display rules.
- Cart or checkout-specific discount calculation changes unless already driven by selected display price logic.

## Decisions

- Extend product type with optional `discountPrice` and `lowestRetailPriceLast30Days` fields.
Rationale: explicit typing prevents ad-hoc field access and runtime mistakes.

- Introduce shared price-display helper logic to derive visual price state.
Rationale: avoids duplicated conditional rendering between listing and detail components.

- Use existing currency formatting utilities for all displayed prices.
Rationale: keeps locale/currency behavior consistent in Finland/Sweden flows.

- Render 30-day lowest price line only when `discountPrice` is present and lowest price value exists.
Rationale: keeps UI clean and avoids misleading empty disclosures.

## Risks / Trade-offs

- [Risk] Mixed combinations of missing pricing fields could create inconsistent output. → Mitigation: centralize fallback order and test edge cases.
- [Risk] Styling regressions across card/detail components. → Mitigation: add targeted component/helper tests and keep class naming explicit.
- [Risk] Cart uses wrong base price if pricing priority is unclear. → Mitigation: verify existing `getProductPrice` behavior and update if required by accepted pricing rules.
