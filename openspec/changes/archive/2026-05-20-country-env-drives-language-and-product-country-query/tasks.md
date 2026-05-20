## 1. Country Config Foundation

- [x] 1.1 Add shared country resolver using `EXPO_PUBLIC_COUNTRY` with default `FI`.
- [x] 1.2 Add normalization/guarding for supported values (`FI`, `SE`).

## 2. Language Defaults

- [x] 2.1 Update i18n initialization/default language logic to use resolved country.
- [x] 2.2 Ensure Sweden (`SE`) defaults to Swedish and fallback (`FI`) preserves current behavior.

## 3. Product Fetch Context

- [x] 3.1 Update product fetch helper/service to include `country` query parameter.
- [x] 3.2 Ensure all product list/search/detail fetch paths use shared country resolver output.

## 4. Verification

- [x] 4.1 Add/update tests for country resolution fallback and supported-value behavior.
- [x] 4.2 Add/update tests for product fetch request params including `country`.
- [x] 4.3 Add/update tests for localization default behavior by country.
- [x] 4.4 Run relevant Jest suites and confirm no regressions.
