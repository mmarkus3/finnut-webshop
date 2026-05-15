## Context

Product card descriptions in home carousel and category grid are currently line-clamped but container heights can still vary based on typography flow and surrounding spacing, causing uneven card layouts. The requested behavior is a fixed-size description area across list/grid cards for consistent visual alignment.

## Goals / Non-Goals

**Goals:**
- Enforce the same description container height across home and category product cards.
- Preserve current truncation behavior while reserving fixed vertical space.
- Keep image, price, availability, and action behaviors unchanged.
- Add regression coverage for fixed description container size behavior.

**Non-Goals:**
- Rewriting card content hierarchy.
- Changing description source text logic.
- Altering product routing or add-to-cart behavior.

## Decisions

1. Add a shared fixed-height utility class/pattern for description container in both card surfaces.
- Rationale: consistency and easier maintenance.

2. Keep text clamp (`numberOfLines`) and combine with minimum/fixed height container.
- Rationale: ensures equal vertical spacing even for short descriptions.

3. Do not change metadata ordering or card CTA placement.
- Rationale: minimizes behavioral risk and isolates layout improvement.

## Risks / Trade-offs

- [Very long text still truncated] -> Mitigation: expected behavior retained via clamp.
- [Short text leaves visual whitespace] -> Mitigation: acceptable trade-off for card alignment consistency.
- [Cross-platform text metrics differences] -> Mitigation: verify through tests and keep fixed container class explicit.
