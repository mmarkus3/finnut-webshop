## Why

Users can currently stop at cart summary but cannot proceed into a checkout flow or provide customer details. We need to create an order on checkout start and route users to a dedicated checkout page so order completion can continue with customer information.

## What Changes

- When user presses cart checkout button, construct an order object from cart contents and POST it to backend.
- Use `new OrdersService(process.env.EXPO_PUBLIC_FIREBASE_API!, `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}`)` for order DB communication.
- Add checkout page route and UI that asks for customer information fields.
- Show cart-like product and price summary on checkout page.
- Handle order creation loading/error path so navigation occurs only after successful order creation.

## Capabilities

### New Capabilities
- `checkout-customer-information-page`: Dedicated checkout page that captures customer info and displays order/cart summary.

### Modified Capabilities
- `cart-order-summary-breakdown`: Checkout CTA behavior changes from presentational button to order-creation action with navigation to checkout page.
- `shopping-cart-management`: Cart-to-checkout transition creates backend order payload from cart items.

## Impact

- Affected code: `components/cart/CartPage.tsx`, new checkout page/screen components under `app/checkout`, order hooks/services, and i18n keys.
- Integrations: Firebase-backed REST via `OrdersService` with existing env vars (`EXPO_PUBLIC_FIREBASE_API`, `EXPO_PUBLIC_COMPANY`).
- Testing: add tests for order payload mapping, service invocation, success navigation, and checkout summary/customer form rendering.
