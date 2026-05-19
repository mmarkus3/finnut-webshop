## Why

Product detail currently renders all images in a vertical list, which is heavy to scroll and less user-friendly on mobile. A swipeable carousel gives a clearer, more familiar product image browsing experience.

## What Changes

- Replace product detail image list rendering with a swiper-based image carousel.
- Keep existing fallback image behavior when no valid product images are available.
- Add visible pagination/position indication for carousel slides.
- Preserve responsive behavior and accessibility labels for product images.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `product-detail-navigation-and-layout`: Product detail image behavior SHALL support swipe navigation through product images using a carousel interaction model.

## Impact

- Affected code includes product detail image UI and helper usage.
- May require adding or using an existing swiper dependency in the app.
- Product detail tests should be updated for carousel-oriented image behavior and fallback handling.
