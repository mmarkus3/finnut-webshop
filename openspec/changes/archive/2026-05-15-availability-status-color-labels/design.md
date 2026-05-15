## Context

Availability is currently shown as raw numeric amount text, which requires users to interpret stock urgency manually. The requested behavior introduces three explicit stock statuses with semantic colors and Finnish labels. This affects multiple product surfaces (home carousel cards, category grid cards, and product detail page), so a shared mapping approach is needed to keep behavior consistent.

## Goals / Non-Goals

**Goals:**
- Define deterministic availability thresholds and labels:
  - `<=0` => red `Loppu varastosta`
  - `1..9` => yellow `Loppuu pian`
  - `>=10` => green `Varastossa`
- Apply the same status rendering logic across all product surfaces.
- Localize status texts via i18next instead of hard-coded UI strings.
- Keep existing product card/detail layouts intact while updating availability presentation.

**Non-Goals:**
- Changing inventory data source or amount semantics.
- Adding per-product custom thresholds.
- Introducing stock reservation or checkout inventory validation logic.

## Decisions

1. Add a shared availability-status helper that maps `amount` to status key + style token.
- Rationale: Prevents duplicated threshold logic and guarantees parity across components.
- Alternative considered: inline conditional logic per component. Rejected due to drift risk.

2. Replace direct availability amount label with status chip/text in all affected views.
- Rationale: Makes urgency immediately scannable and satisfies explicit label/color requirements.

3. Keep quantity value available for accessibility labels/tooltips where useful, but primary visible state is status text.
- Rationale: preserves informational depth while prioritizing visual signal.

4. Use existing theme utility classes for red/yellow/green styling to stay consistent with design system.
- Rationale: Avoids one-off color values and keeps maintainability.

## Risks / Trade-offs

- [Threshold misinterpretation] -> Mitigation: Centralize mapping in one helper and cover with Jest tests.
- [Color-only communication accessibility risk] -> Mitigation: Always show text label alongside color.
- [Label consistency drift across locales] -> Mitigation: Single translation keys reused across all surfaces.
