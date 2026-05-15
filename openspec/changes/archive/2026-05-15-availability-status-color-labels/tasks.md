## 1. Shared Availability Status Logic

- [x] 1.1 Add a shared helper that maps `amount` to status key (`outOfStock`, `lowStock`, `inStock`) using thresholds 0, 1..9, and >=10.
- [x] 1.2 Add shared style mapping for status colors (red/yellow/green) to avoid per-component duplication.
- [x] 1.3 Add unit tests for threshold boundaries and label/style mapping behavior.

## 2. Home And Category Product Cards

- [x] 2.1 Replace raw availability amount text in home product cards with threshold-based status label.
- [x] 2.2 Replace raw availability amount text in category grid product cards with threshold-based status label.
- [x] 2.3 Ensure status label includes both text and color on both card surfaces.

## 3. Product Detail Availability

- [x] 3.1 Replace raw availability amount text in product detail page with threshold-based status label.
- [x] 3.2 Keep existing product detail layout behavior while integrating status label styling.
- [x] 3.3 Ensure product detail not-found/loading states remain unchanged.

## 4. Localization And Verification

- [x] 4.1 Add i18next keys for `Loppu varastosta`, `Loppuu pian`, and `Varastossa` labels plus any required accessibility text.
- [x] 4.2 Extend tests for home/category/product detail components to assert status label text per threshold.
- [x] 4.3 Extend tests to assert color/state class selection for each threshold category.
