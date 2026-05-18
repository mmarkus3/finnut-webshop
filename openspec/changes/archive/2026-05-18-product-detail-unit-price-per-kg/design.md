## Context

Product detail page currently displays product price with localized currency but no unit price indicator. To support comparison shopping, unit price per kilogram should be visible when product fields allow reliable calculation.

## Goals / Non-Goals

**Goals:**
- Show unit price per kg on product detail page.
- Keep currency localization consistent with existing price formatting.
- Avoid displaying misleading values when required input is missing/invalid.
- Cover logic with tests.

**Non-Goals:**
- Changing list/grid card pricing in this change.
- Introducing backend schema changes.
- Supporting unit-price conversions beyond per kg.

## Decisions

- Compute unit price in product-detail domain/helper layer and render near main price.
Rationale: keeps calculation logic testable and isolated from JSX complexity.

- Reuse existing price formatting utility for localized currency output.
Rationale: ensures consistent `€`/`SEK` handling with existing app behavior.

- Add conditional rendering: show value only when both price and weight inputs are valid.
Rationale: prevents incorrect or confusing output.

## Risks / Trade-offs

- [Risk] Product weight source field may vary or be missing. -> Mitigation: safe guards and fallback to hidden unit-price line.
- [Trade-off] Some products may not show unit price due to incomplete data. -> Mitigation: keep behavior explicit and non-breaking.
