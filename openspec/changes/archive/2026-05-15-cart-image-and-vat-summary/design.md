## Context

The cart page currently focuses on name/quantity/price but does not show product images and does not expose VAT amount in totals. The requested behavior requires both visual line-item improvements and financial summary extension, with VAT computed from per-product `tax` values where `tax` is a decimal percentage (for example `0.255`).

## Goals / Non-Goals

**Goals:**
- Render product image per cart line item with fallback placeholder support.
- Show total price and VAT amount summary on cart page.
- Compute VAT deterministically from line-item unit price, quantity, and `product.tax` decimal percentage.
- Keep existing quantity controls and remove/clear interactions unchanged.

**Non-Goals:**
- Introducing checkout/payment flow changes.
- Reworking cart persistence model.
- Changing product pricing source fields beyond VAT calculation extension.

## Decisions

1. Reuse existing product image fallback helper/path for cart line item thumbnails.
- Rationale: keeps image behavior consistent across app surfaces.

2. Extend cart selectors/helpers with VAT summary computation.
- Rationale: centralizes calculation logic and keeps UI thin.

3. Treat missing `product.tax` as zero VAT contribution.
- Rationale: defensive behavior for partial product data.

4. Display VAT as separate summary row next to total for clarity.
- Rationale: meets visibility requirement without changing existing total semantics.

## Risks / Trade-offs

- [Inconsistent tax data on products] -> Mitigation: default missing/invalid tax to `0` and cover in tests.
- [Rounding differences] -> Mitigation: standardize VAT rounding to two decimals in summary rendering.
- [Card height growth from images] -> Mitigation: use compact thumbnail dimensions with fallback placeholder.
