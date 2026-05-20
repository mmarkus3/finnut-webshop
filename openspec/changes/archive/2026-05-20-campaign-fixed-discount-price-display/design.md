## Context

Current discount logic resolves product-level percentage discounts and computes discounted prices accordingly. Campaign product data can also provide `discountFixed`, which should set a direct discounted unit price for specific products.

## Goals / Non-Goals

**Goals:**
- Support `discountFixed` from campaign product entries in cart/checkout pricing.
- Preserve existing original-vs-discounted price presentation pattern.
- Keep summary totals consistent with line-level fixed pricing.

**Non-Goals:**
- Redesigning backend campaign schema.
- Supporting stacked fixed+percentage application simultaneously for one product unless explicitly defined by precedence rules.

## Decisions

- Extend campaign product type to include `discountFixed` as optional numeric field.
Rationale: keeps type-safe consumption of campaign payload.

- Define precedence: if valid `discountFixed` exists for a product, use it; otherwise fallback to percentage logic.
Rationale: deterministic behavior and straightforward user expectation for fixed campaign prices.

- Clamp fixed discounted prices to non-negative values.
Rationale: prevents invalid negative price outputs from malformed data.

- Reuse existing line and totals helper pipeline with minimal API changes.
Rationale: reduces regression risk and keeps cart/checkout consistent.

## Risks / Trade-offs

- [Risk] Ambiguous data when both fixed and percentage exist. → Mitigation: explicit precedence rule and tests.
- [Risk] Invalid fixed values could break totals. → Mitigation: numeric validation and clamping in helper.
- [Risk] Rounding mismatches in totals. → Mitigation: keep existing rounding strategy and extend tests for fixed values.
