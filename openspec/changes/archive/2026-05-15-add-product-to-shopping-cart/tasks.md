## 1. Cart State Foundation

- [x] 1.1 Create cart domain types and a centralized cart state provider/hook.
- [x] 1.2 Implement cart actions: add item, increment quantity, decrement quantity, remove item, and clear cart.
- [x] 1.3 Add derived selectors for cart item count and total price to support header and cart page UI.

## 2. Product Surface Add-To-Cart Actions

- [x] 2.1 Add add-to-cart CTA on homepage/category product cards and wire action to cart state.
- [x] 2.2 Add add-to-cart CTA on product detail page and wire action to cart state.
- [x] 2.3 Ensure quantity additions respect product stock limits and provide disabled behavior where needed.

## 3. Header Cart Integration

- [x] 3.1 Wire header cart action to navigate to a dedicated cart route/page.
- [x] 3.2 Display cart item count status in header cart icon/badge and keep it synchronized with cart state.
- [x] 3.3 Keep header action accessibility labels and interactions consistent with existing patterns.

## 4. Dedicated Cart Page

- [x] 4.1 Create a dedicated cart page route that renders current cart line items.
- [x] 4.2 Implement line item quantity controls and remove-item actions on cart page.
- [x] 4.3 Implement localized empty-cart and total-summary states on cart page.

## 5. Localization and Verification

- [x] 5.1 Add i18next translation keys for all new cart labels, buttons, and empty states (en/fi/sv).
- [x] 5.2 Add/extend Jest tests for cart state reducer/hook behaviors and derived totals/counts.
- [x] 5.3 Add/extend Jest tests for add-to-cart interactions, cart page rendering, and header count updates.
