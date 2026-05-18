## Context

Cart currently supports quantity increments only through repeated add actions or cart-page controls. Product detail page exposes a single add button. We need pre-add quantity selection and bulk add in one action.

## Goals / Non-Goals

**Goals:**
- Allow selecting quantity >1 on product detail before add.
- Support cart reducer add action with quantity payload.
- Keep stock clamping behavior and cart safety.
- Preserve existing cart increment/decrement semantics.

**Non-Goals:**
- Redesigning cart-page quantity controls.
- Backend order schema changes.
- Per-category/default quantity preferences.

## Decisions

- Extend `ADD_ITEM` action payload with optional quantity (default 1).
Rationale: backwards compatible with existing callers.

- Clamp selected quantity by stock and current cart quantity.
Rationale: prevents over-adding beyond inventory.

- Add compact quantity selector (+/- and value) on product detail page near add button.
Rationale: localized change where user intent is set.

## Risks / Trade-offs

- [Risk] Quantity UI can become inconsistent with stock updates. -> Mitigation: recalculate max addable from `canAddItem` and stock each render.
- [Trade-off] More controls on product detail increase complexity. -> Mitigation: keep minimal and accessible controls.
