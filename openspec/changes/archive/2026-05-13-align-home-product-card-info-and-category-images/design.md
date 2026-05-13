## Context

Product cards are currently diverging between home and category pages: category cards include richer metadata while home cards emphasize a lighter summary. This inconsistency makes browsing context switches feel uneven and creates maintenance overhead for duplicated card logic. In addition, category pages should present product images with deterministic fallback behavior to avoid blank visual blocks.

## Goals / Non-Goals

**Goals:**
- Make home page product cards display the same core product information contract as category page cards.
- Ensure category page product cards render product image first, with fallback image behavior for missing/invalid data.
- Keep behavior consistent across locales, accessibility labels, and existing responsive layouts.

**Non-Goals:**
- Full visual redesign of card styling or spacing across the application.
- Changes to backend product/category APIs.
- Introducing new ranking, sorting, or merchandising logic.

## Decisions

1. Define a shared product-card info contract across surfaces: name, price, availability amount, and description preview.
Rationale: Reduces behavioral drift and makes cards predictable for users.
Alternative considered: keep page-specific field sets. Rejected due to inconsistency.

2. Reuse common helper functions for price, description, and image/fallback selection where possible.
Rationale: Keeps logic centralized and easier to test.
Alternative considered: duplicate logic per page. Rejected due to higher regression risk.

3. Enforce category-page image behavior as first valid product image, otherwise fallback placeholder.
Rationale: Deterministic rendering avoids empty cards and broken media states.
Alternative considered: hide image region when missing. Rejected because it weakens card scanability.

4. Update test coverage at capability boundaries (home card parity + category image fallback).
Rationale: Requirements are mostly behavioral and should be guarded with targeted tests.
Alternative considered: rely on manual QA only. Rejected due to recurring parity regressions.

## Risks / Trade-offs

- [Field parity causes denser home cards] -> Mitigation: keep typography compact while preserving required fields.
- [Image URL validity edge cases] -> Mitigation: treat empty/invalid first image as missing and use fallback.
- [Shared helper changes could affect both pages simultaneously] -> Mitigation: add helper-level tests and per-surface render assertions.
- [Localization gaps for newly surfaced labels] -> Mitigation: ensure all added labels are translated in current locales.
