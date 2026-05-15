## Context

Checkout page now includes customer form + summary content but not an explicit responsive section arrangement contract. Cart page already uses a width-based responsive layout approach that can be mirrored for checkout consistency.

## Goals / Non-Goals

**Goals:**
- Show customer info on left and summary on right on desktop widths.
- Show customer info first and summary second on mobile widths.
- Preserve all existing checkout fields, totals, and localization.

**Non-Goals:**
- No changes to order creation flow.
- No changes to checkout form semantics or validation.

## Decisions

- Reuse width-based breakpoint approach (`DESKTOP_MIN_WIDTH`) already used in cart page.
- Use a single container with conditional `flex-row`/`flex-col` class layout.
- Keep customer section rendered first in markup so mobile naturally stacks top-first.

## Risks / Trade-offs

- [Risk] Breakpoint assumptions may differ between platforms. -> Mitigation: rely on existing shared breakpoint constant used elsewhere.
- [Trade-off] Two-column desktop may reduce horizontal space for small laptops, but improves visual hierarchy on typical desktop widths.
