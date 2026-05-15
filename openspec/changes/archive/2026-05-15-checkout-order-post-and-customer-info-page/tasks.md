## 1. Cart To Checkout Order Creation

- [x] 1.1 Add checkout action handler that maps cart state to order payload.
- [x] 1.2 Integrate `OrdersService(process.env.EXPO_PUBLIC_FIREBASE_API!, \`/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}\`)` in checkout action flow.
- [x] 1.3 Add loading/error handling for checkout action and navigate only after successful order POST.

## 2. Checkout Page UI

- [x] 2.1 Add checkout route/screen and register it in app navigation stack.
- [x] 2.2 Implement customer information form fields (firstname, lastname, email, address_street, address_city, address_zip).
- [x] 2.3 Render product list and price summary on checkout page with cart-consistent structure.

## 3. Localization And Tests

- [x] 3.1 Add i18n keys for checkout page labels, customer form labels, loading/error text, and summary headings.
- [x] 3.2 Add/update tests for cart-to-order payload mapping and OrdersService invocation.
- [x] 3.3 Add/update tests for checkout page rendering (customer fields + summary visibility) and navigation behavior.
