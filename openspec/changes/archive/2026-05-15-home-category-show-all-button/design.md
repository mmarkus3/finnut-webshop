## Context

Home category sections currently expose a category title and a horizontal product preview, but no direct call-to-action for reaching the full category listing. Users must use separate category navigation controls, which adds friction when they are already engaging with a specific category section. The change is focused UI/navigation behavior on home page category sections and should reuse existing category routes.

## Goals / Non-Goals

**Goals:**
- Add a clear "Show all" action per home category section.
- Navigate directly to `/category/[categoryId]` from that action.
- Keep current carousel and card interactions unchanged.
- Localize button label and accessibility copy using i18next.

**Non-Goals:**
- Altering category route behavior or filtering logic.
- Redesigning home layout beyond section header action.
- Changing how categories are loaded or sorted.

## Decisions

1. Place "Show all" button in the category section header row next to the category title.
- Rationale: Associates action with the section context and keeps discoverability high.

2. Reuse existing `router.push({ pathname: '/category/[categoryId]', params: { categoryId } })` navigation contract.
- Rationale: Avoids new routes and keeps behavior aligned with existing category entry points.

3. Use i18next keys for button text and accessibility labels.
- Rationale: Keeps localization parity across supported locales and avoids hard-coded copy.

## Risks / Trade-offs

- [Header row crowding on small widths] -> Mitigation: keep button compact and use text styles consistent with existing UI.
- [Competing tap targets inside section] -> Mitigation: ensure button press handler is isolated from card carousel interactions.
- [Localization overflow] -> Mitigation: use short translated labels and stable spacing classes.
