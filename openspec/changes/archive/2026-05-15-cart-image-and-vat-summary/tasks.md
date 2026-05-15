## 1. Cart Line Item Images

- [x] 1.1 Add product image thumbnail rendering to each cart line item.
- [x] 1.2 Reuse existing image fallback behavior when line item has no usable image.
- [x] 1.3 Ensure cart line item layout remains readable with image thumbnail included.

## 2. VAT Calculation And Summary

- [x] 2.1 Extend cart calculation helpers/selectors to compute VAT per line item using `unitPrice * quantity * product.tax`.
- [x] 2.2 Treat missing or invalid `product.tax` as zero VAT contribution.
- [x] 2.3 Add VAT summary row to cart totals section and render with two-decimal formatting.

## 3. Localization And Verification

- [x] 3.1 Add i18next keys for VAT summary labels and any image accessibility text additions.
- [x] 3.2 Extend cart helper tests to verify decimal tax VAT calculations and aggregation.
- [x] 3.3 Extend cart page tests to verify line item image/fallback rendering and VAT summary visibility.
