## 1. Shared Image Presentation Adjustments

- [x] 1.1 Identify current image fit/crop settings used by home card and category grid card image elements.
- [x] 1.2 Update card image rendering to use full-image visibility (contain-style behavior) while retaining fallback source logic.
- [x] 1.3 Keep image container sizing/background stable to avoid breaking existing card layout rhythm.

## 2. Home And Category Card Integration

- [x] 2.1 Apply full-image rendering behavior to home category product cards.
- [x] 2.2 Apply full-image rendering behavior to category page product grid cards.
- [x] 2.3 Verify card metadata and interactions remain unchanged after image-fit updates.

## 3. Verification

- [x] 3.1 Extend tests to assert home product cards render complete image behavior and preserve fallback.
- [x] 3.2 Extend tests to assert category grid cards render complete image behavior and preserve fallback.
- [x] 3.3 Add regression checks for image-related card rendering to ensure no crop reintroduction.
