## 1. Shared Product Card Information Parity

- [x] 1.1 Identify or create shared helper logic for product price, availability text, and localized description preview.
- [x] 1.2 Update home page product cards to display name, price, availability amount, and description preview fields to match category page cards.
- [x] 1.3 Ensure home page description preview is capped at three lines and remains readable in carousel layout.

## 2. Category Page Image and Fallback Behavior

- [x] 2.1 Update category page product card rendering to show product image in each card.
- [x] 2.2 Implement deterministic image selection on category page (first usable image URL).
- [x] 2.3 Add fallback placeholder image behavior when category page product images are missing or unusable.

## 3. Localization, Accessibility, and Validation

- [x] 3.1 Add/update i18next keys needed for aligned product-card metadata labels across home and category pages.
- [x] 3.2 Ensure image/product card accessibility labels remain meaningful after parity and image changes.
- [x] 3.3 Add or update Jest/component tests for home/category metadata parity and category-page image/fallback scenarios.
