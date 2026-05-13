## Context

The home page currently lacks a structured browse experience where users can scan categories and products together. The requested behavior is to show repeated category sections on the home page, each followed by a product carousel. This must reuse current category/product sources, keep presentation accessible, and support image fallback when products do not have images.

## Goals / Non-Goals

**Goals:**
- Show category headings on the home page with associated product carousels directly beneath each heading.
- Group products by category id/slug using existing product/category data.
- Render the first product image when present.
- Render a placeholder image when no product image exists.
- Keep UI responsive and accessible for touch, keyboard focus, and assistive technologies.

**Non-Goals:**
- Reworking backend product/category APIs.
- Building advanced ranking/personalization for product order.
- Full redesign of other home page sections unrelated to category/product browsing.

## Decisions

1. Build a dedicated `HomeCategoryProductSections` component that receives categories/products and outputs section blocks.
Rationale: Keeps grouping and rendering logic modular and testable.
Alternative: Inline logic inside home page screen. Rejected to avoid bloating screen component.

2. Group products client-side by category key from existing product/category fields.
Rationale: No API changes required and behavior can be implemented immediately with existing data.
Alternative: Introduce new server endpoint returning grouped sections. Rejected as unnecessary for this scope.

3. Render section products in horizontal `ScrollView` carousels.
Rationale: Matches requested carousel behavior and remains simple in React Native/Expo.
Alternative: Grid cards per category. Rejected because it does not satisfy carousel requirement.

4. Image selection rule: first product image if available; otherwise fallback placeholder asset.
Rationale: Deterministic display with graceful handling of incomplete data.
Alternative: Hide products missing images. Rejected because it reduces discoverability and violates requirement.

## Risks / Trade-offs

- [Large number of categories/products increases render cost] -> Mitigation: cap per-category items for initial render or defer optimization after profiling.
- [Inconsistent category references between products and categories] -> Mitigation: ignore orphaned product mappings and log/debug during development.
- [Missing or broken image URLs] -> Mitigation: include on-error fallback to placeholder and test empty-image scenarios.
- [Horizontal scroll discoverability on small screens] -> Mitigation: spacing and clear section labels, plus optional affordances (peek card edges).
