## Context

The category page should clearly communicate what category the user is viewing and present all matching products in a structured browsing layout. Current behavior does not meet the requested experience of category-name title plus responsive grid rows with product metadata and capped description length.

## Goals / Non-Goals

**Goals:**
- Show the selected category's display name as the category page title.
- List all products belonging to the selected category.
- Render a responsive grid with 4 products per row on desktop and 1 per row on mobile.
- Include product name, price, availability (`amount`), and up to three lines of description in each card.

**Non-Goals:**
- Introducing new catalog APIs or schema changes.
- Changing homepage behavior or non-category product pages.
- Adding advanced sort/filter controls beyond category filtering.

## Decisions

1. Resolve title from category id route param by mapping to loaded category data.
Rationale: Ensures the page title is category name, not technical identifier.
Alternative considered: Keep raw route id as title. Rejected due to poor UX.

2. Filter products by their existing category field and render full matching set.
Rationale: Uses current data model and avoids backend changes.
Alternative considered: Query backend per category route. Rejected for now because current client data already contains the needed fields.

3. Implement a responsive grid layout driven by viewport/breakpoint logic.
Rationale: Required behavior differs by platform size (desktop vs mobile).
Alternative considered: single-column list everywhere. Rejected because desktop requirement is 4 columns.

4. Use card-level text clamping/line limit for descriptions to maximum three lines.
Rationale: Keeps grid tidy and prevents long descriptions from breaking row rhythm.
Alternative considered: full description body. Rejected due to inconsistent card heights.

## Risks / Trade-offs

- [Category id not found in category dataset] -> Mitigation: fallback title using route id and keep product rendering functional.
- [Inconsistent product pricing fields across data] -> Mitigation: define a deterministic display priority for price fields and validate null handling.
- [Description line clamp support differs across platforms] -> Mitigation: use React Native `numberOfLines={3}` for cross-platform consistency.
- [Large product counts can affect render performance] -> Mitigation: use `FlatList` grid virtualization rather than rendering all cards eagerly.
