## Why

Prices are currently shown without a currency marker, which makes totals and product prices ambiguous for users in different markets. We need locale-aware currency display now because the storefront already serves Finland and Sweden and should clearly communicate price context.

## What Changes

- Add locale-aware price formatting so visible prices include currency on product and cart surfaces.
- Map Finnish locale (`fi`) prices to euro (`€`) and Swedish locale (`sv`) prices to Swedish krona (`SEK`).
- Use a shared formatting utility to keep currency output consistent across cards, detail page, search results, and cart summary rows.
- Update tests to verify localized currency display in key UI surfaces.

## Capabilities

### New Capabilities
- `localized-price-formatting`: Centralized rules for displaying prices with locale-specific currency symbols/codes across the app.

### Modified Capabilities
- `homepage-category-product-sections`: Product card price text must include locale-specific currency.
- `category-page-product-grid`: Category grid product price text must include locale-specific currency.
- `product-detail-navigation-and-layout`: Product detail page price text must include locale-specific currency.
- `cart-image-and-vat-breakdown`: Cart line-item prices and summary values (VAT and total) must include locale-specific currency.

## Impact

- Affected code: shared product/cart price rendering paths, home/category/product/cart/search UI components, and translation-backed labels.
- Testing: Jest tests for formatting utility and UI snapshots/assertions that include `€` for Finnish and `SEK` for Swedish.
- No backend or API contract changes expected.
