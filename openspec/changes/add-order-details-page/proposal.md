## Why

Customers need a direct way to review a submitted order after checkout without requiring a new account or in-app navigation flow. An order page accessible by its URL allows an order link to present status, contents, total, and customer details from the stored order.

## What Changes

- Add an unlinked order-details page at `/order?orderId=<id>` that reads the order ID query parameter.
- Fetch the matching order through the existing company-scoped `OrdersService.get(orderId)` API flow and handle loading, missing-ID, and retrieval-error states.
- Show the order ID and a status timeline for `draft`, `pending`, `placed`, and `sent`, with completed statuses in light green, the current status in green, and future statuses in gray.
- Display ordered products with product name, amount, and stored final price, plus a total order sum derived from the returned product lines.
- Display the stored customer information for the order.
- Provide translated UI content for the supported application languages.

## Capabilities

### New Capabilities
- `order-details-page`: Direct-link order retrieval and presentation of order status timeline, products, order sum, and customer information.

### Modified Capabilities
- None.

## Impact

- Affected code: Expo Router order route, a dedicated order-details presentation component, and an order-fetching hook or service wrapper using `OrdersService.get`.
- Affected localization: order-details labels, timeline statuses, and loading/error/empty states in Finnish, English, and Swedish.
- Affected API usage: existing `GET /orders/company/${process.env.EXPO_PUBLIC_COMPANY}/<orderId>` behavior exposed through `OrdersService.get`.
- Affected tests: URL parameter handling, order retrieval, timeline state styling, rendered products/total/customer information, and error/loading states.
- No model-interface change is required; the existing `Order`, `OrderProduct.finalPrice`, and `OrderCustomer` fields provide the display data.
