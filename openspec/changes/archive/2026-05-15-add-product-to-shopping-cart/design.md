## Context

The webshop has product browsing and product detail navigation, but there is no shopping cart behavior yet. Users cannot collect products or manage quantities before checkout. The change crosses product listing cards, product detail actions, header cart icon state, a new cart page route, and localized UI copy. Implementation should stay modular, accessibility-friendly, and aligned with current component styling patterns.

## Goals / Non-Goals

**Goals:**
- Enable users to add products to cart from key product surfaces.
- Persist cart state in-app during the current session and keep quantity updates predictable.
- Expose cart status in the header (item count badge or equivalent).
- Provide a dedicated cart page for review, quantity changes, item removal, and total calculation.
- Localize all cart texts with i18next and cover behavior with Jest tests.

**Non-Goals:**
- Implementing payment, checkout submission, or order creation.
- Persisting cart to backend or user account across devices.
- Adding promotions, coupon logic, or shipping/tax engines.

## Decisions

1. Introduce a dedicated cart state layer (hook + context/provider) with line-item keyed by product identifier.
- Rationale: Shared state across header, product cards, detail view, and cart page without prop drilling.
- Alternative considered: Local state per page with route params. Rejected due to synchronization complexity and poor scalability.

2. Use deterministic cart actions: add item, increment/decrement quantity, remove item, clear cart.
- Rationale: Explicit operations simplify test coverage and reduce accidental state drift.
- Alternative considered: single "set cart" mutator. Rejected because it hides intent and increases misuse risk.

3. Surface add-to-cart CTA on both product cards and product detail page.
- Rationale: Supports quick add from browsing and detailed decision flow from product page.
- Alternative considered: detail page only. Rejected because it adds friction for repeat/quick shopping.

4. Add dedicated `/cart` page for full cart management and navigate header cart icon there.
- Rationale: Clear destination for cart review and quantity management; keeps modal/header simple.
- Alternative considered: cart modal in header. Rejected for reduced space and complex responsive behavior.

5. Compute totals from existing price helpers with fallback handling for unavailable price.
- Rationale: Reuses existing pricing logic and avoids divergence in price formatting behavior.

## Risks / Trade-offs

- [Cart state resets on app reload] -> Mitigation: Document session-only scope for now and keep state interface ready for future persistence.
- [Quantity controls may exceed stock] -> Mitigation: Clamp increments by available amount and show disabled state where appropriate.
- [Price missing for some products] -> Mitigation: Preserve line item with unavailable price label and exclude missing price from total sum.
- [Header badge can become visually crowded] -> Mitigation: Cap badge display (e.g. `99+`) and keep spacing consistent with current header layout.
