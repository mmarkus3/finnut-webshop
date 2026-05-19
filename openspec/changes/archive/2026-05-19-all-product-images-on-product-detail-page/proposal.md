## Why

Product detail currently does not reliably show all images available for a product, which makes it harder for customers to evaluate products before purchase. This change is needed to improve product transparency and reduce uncertainty during shopping.

## What Changes

- Update product detail behavior to render all available product images, not just a single image.
- Add a product image gallery/list presentation on product detail that supports zero, one, or many images.
- Keep existing fallback behavior when no product images are available.
- Ensure the multi-image presentation remains responsive and accessible on mobile and desktop.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `product-detail-navigation-and-layout`: Product detail requirements are expanded so all product images SHALL be visible on the product detail page with appropriate fallback behavior.

## Impact

- Affected code likely includes product detail page UI components and related style/layout helpers.
- Existing product detail tests need updates for multi-image rendering scenarios.
- No backend API change is required.
