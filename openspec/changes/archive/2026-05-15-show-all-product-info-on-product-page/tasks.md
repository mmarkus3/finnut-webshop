## 1. Product Detail Field Coverage

- [x] 1.1 Inventory all currently available `Product` model fields and define render order/grouping for product page.
- [x] 1.2 Add or update helper mapping utilities to format optional product fields safely.
- [x] 1.3 Extend product detail UI to render all available product attributes with stable fallback behavior.

## 2. Information Structure and Layout

- [x] 2.1 Add structured sections for extended product details (for example nutrition, ingredients, origin).
- [x] 2.2 Ensure long-form fields (ingredients/descriptions) render cleanly across desktop and mobile layouts.
- [x] 2.3 Preserve existing responsive split/stack behavior while expanding information density.

## 3. Localization

- [x] 3.1 Add i18next keys for all new product detail section headings and field labels in `en`, `fi`, and `sv`.
- [x] 3.2 Replace any new hard-coded text with localized keys and fallbacks.
- [x] 3.3 Verify localized fallback text appears when values are missing.

## 4. Verification

- [x] 4.1 Extend product detail Jest tests to cover rendering of newly displayed fields.
- [x] 4.2 Add test cases for missing optional attributes to ensure safe fallback behavior.
- [x] 4.3 Add test cases ensuring localized labels/sections are used for extended product information.
