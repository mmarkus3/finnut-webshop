## Context

The app currently renders numeric prices using hard-coded strings (for example `toFixed(2)`) and does not consistently include currency markers. Price output appears on multiple surfaces (home cards, category grid, product detail, search results, cart line items, VAT, and total summary), so currency behavior must be centralized to avoid drift. The app already uses i18next and locale switching, making locale-driven formatting straightforward.

## Goals / Non-Goals

**Goals:**
- Introduce one shared formatter for display prices that receives numeric value and active locale.
- Render `€` for Finnish locale (`fi`) and `SEK` for Swedish locale (`sv`) on all user-visible price strings.
- Update price labels in cart summaries (including VAT and total) and product-related views to use the shared formatter.
- Add test coverage for formatter mapping and representative UI surfaces.

**Non-Goals:**
- No currency conversion between markets.
- No backend pricing model or tax calculation changes.
- No changes to product storage format or API contracts.

## Decisions

- Create a shared utility (for example `formatPriceWithCurrency`) used by product and cart components.
  - Rationale: avoids duplicated locale checks and keeps formatting consistent.
  - Alternative considered: inline `i18n.language` checks per component; rejected due to repetition and drift risk.
- Use locale mapping rules: `fi -> €`, `sv -> SEK`; default fallback to `€` for unsupported locales.
  - Rationale: explicit requirement for Finland/Sweden while retaining deterministic fallback.
  - Alternative considered: derive currency solely from `Intl.NumberFormat` region defaults; rejected because locale tags in app may not always include region codes.
- Keep two-decimal rendering behavior aligned with existing UI where prices are currently shown with `toFixed(2)`.
  - Rationale: minimizes visual regressions while adding currency context.

## Risks / Trade-offs

- [Risk] Some components may still render raw prices and miss the shared formatter. -> Mitigation: grep-based sweep for price labels and targeted Jest assertions.
- [Risk] Locale fallback may not match future country expansion. -> Mitigation: keep mapping isolated in one utility for easy extension.
- [Trade-off] Using `SEK` text instead of `kr` is less compact but clearer and aligned with requirement wording.
