## Context

The product detail page already resolves and normalizes image URLs, then renders all images directly. We need to keep the same data behavior while changing only presentation and interaction to a swiper carousel that works well on mobile and desktop.

## Goals / Non-Goals

**Goals:**
- Show product images in a swipeable carousel on product detail.
- Preserve image normalization and fallback logic.
- Keep layout responsive and accessible.
- Add deterministic test coverage for carousel rendering conditions.

**Non-Goals:**
- Introducing zoom/lightbox features.
- Changing product image data contracts from backend.
- Reworking image behavior on category/list/cart views.

## Decisions

- Reuse normalized image URL list and switch rendering layer to swiper component.
Rationale: minimizes data-path risk and isolates changes to UI interaction.

- Keep fallback as a single static image slide when there are no valid image URLs.
Rationale: avoids blank states and preserves existing UX resilience.

- Use simple pagination indicator (dots or index text) supported by selected swiper implementation.
Rationale: improves discoverability of multiple images.

- Update tests around helper behavior and component output states (no image/single/multiple).
Rationale: keeps behavior stable during UI refactor.

## Risks / Trade-offs

- [Risk] Swiper dependency may increase bundle size. → Mitigation: use lightweight package and only on product detail.
- [Risk] Gesture conflicts in nested scroll contexts. → Mitigation: test swipe behavior in page scroll and tune swiper props.
- [Risk] Carousel accessibility can regress. → Mitigation: preserve image accessibility labels and verify keyboard/screen-reader basics where supported.
