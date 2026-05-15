## Context

The current product detail page already supports navigation, safe fallback, and responsive layout, but it does not expose all available product fields from the `Product` model. Important attributes such as nutrition facts, ingredients, and origin can be missing from UI even when data exists. This change focuses on expanding detail rendering coverage while preserving the existing responsive layout and navigation behavior.

## Goals / Non-Goals

**Goals:**
- Display all relevant product data fields available on the product detail page.
- Organize detailed attributes into readable sections (core info, ingredients, nutrition, origin).
- Keep missing values safe and user-friendly with clear fallback text.
- Localize all newly introduced field labels and section headings through i18next.

**Non-Goals:**
- Changing product fetch source or backend data contracts.
- Introducing editing/management UI for product data.
- Redesigning overall product page navigation behavior.

## Decisions

1. Keep current detail page route and responsive structure, and extend the right-side/detail content block with additional sections.
- Rationale: Minimizes layout churn and avoids regressions in navigation/responsiveness.

2. Introduce a field rendering map/helper for optional attributes.
- Rationale: Avoids repetitive conditional JSX and keeps product detail component maintainable.

3. Render only fields that have values, but keep section-level placeholders where all related values are missing.
- Rationale: Balances completeness and readability without showing noisy empty rows.

4. Reuse existing localization pattern by adding explicit keys for each new field label and section title.
- Rationale: Ensures language parity and avoids hard-coded strings.

## Risks / Trade-offs

- [Dense information can overwhelm users] -> Mitigation: Use grouped sections and concise labels.
- [Inconsistent source data quality] -> Mitigation: Add robust null/undefined guards and fallback texts.
- [Long ingredient text may impact layout] -> Mitigation: Use multi-line wrapped text and spacing tuned for mobile/desktop.
