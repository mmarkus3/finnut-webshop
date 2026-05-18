## 1. Cart Logic

- [x] 1.1 Extend cart add-item action/payload to accept quantity.
- [x] 1.2 Keep backward compatibility for existing single-add callers.
- [x] 1.3 Clamp added quantity against stock and current quantity.

## 2. Product Detail UI

- [x] 2.1 Add quantity selector controls (+/- and displayed quantity) on product detail page.
- [x] 2.2 Wire add button to pass selected quantity to cart add action.

## 3. Verification

- [x] 3.1 Update/add cart reducer tests for multi-quantity add behavior.
- [x] 3.2 Update/add product-detail tests for quantity selection and add payload behavior.
