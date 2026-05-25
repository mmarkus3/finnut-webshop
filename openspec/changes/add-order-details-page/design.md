## Context

The webshop creates and updates orders through a company-scoped `OrdersService`, and `RestService.get(id)` already supplies the required GET behavior. The existing `Order` contract contains `id`, the ordered product lines with optional `finalPrice`, customer fields, and the status sequence values `draft`, `pending`, `placed`, and `sent`. Existing pages use Expo Router query parameters, `AppPageWithInfoLink`, i18next resources for Finnish, English, and Swedish, and shared localized price formatting.

This feature exposes order information through an unlinked URL rather than introducing customer accounts or an order history navigation surface. Because customer information is included in the result, possession and distribution of an order URL has privacy implications.

## Goals / Non-Goals

**Goals:**

- Provide an unlinked order details route at `/order?orderId=<id>`.
- Fetch the order by query parameter with `OrdersService.get`.
- Render order identifier, status timeline, purchased products, calculated order sum, and customer information.
- Follow existing layout, currency formatting, localization, loading, and error-state patterns.
- Keep the feature testable through isolated fetching and timeline/state helpers.

**Non-Goals:**

- Adding an order-history link, customer account area, or navigation entry to the page.
- Introducing authentication, authorization, email delivery of order links, or changes to backend order-ID security.
- Changing order interfaces in `/types` or adding new order persistence fields.
- Modifying payment-success behavior or checkout flow.

## Decisions

- Add an Expo Router screen for `/order` that reads `orderId` with `useLocalSearchParams` and renders a dedicated order details component inside the established page/footer wrapper. This follows the existing `/payment/success` structure and deliberately avoids discoverable site navigation.
- Add a focused order retrieval helper or hook that constructs the existing company-scoped `OrdersService` and invokes `get(orderId)`. Reusing the existing service avoids duplicate Axios route construction and does not require a new API contract.
- Define the timeline status order as `draft`, `pending`, `placed`, `sent`, matching the existing `Order.status` union. Timeline presentation maps items before the current state to light green, the exact current state to green, and items after it to gray.
- Display each returned product's `name`, `amount`, and `finalPrice`, formatting price values with the existing localized formatter. Compute the displayed order sum as the sum of `amount * finalPrice` for returned product lines; if a required final price is absent, render an unavailable-price/total state rather than fabricating a price.
- Display returned customer name, email, phone number, and address fields in a distinct customer information section. No customer details are inferred outside the fetched order payload.
- Add translations under an order-details namespace in each existing language resource, including titles, status labels, loading/error/missing-order text, product and summary labels, and customer-information labels.

## Risks / Trade-offs

- [The URL exposes personal order and customer information to anyone able to obtain a valid order ID] -> Keep the page unlinked as requested and treat order-ID confidentiality/backend access protections as a required deployment concern; do not imply account-level authorization in the UI.
- [The TypeScript contract permits `finalPrice` to be absent] -> Render a clear unavailable state for affected price/total content instead of producing a misleading sum.
- [The backend could return an unexpected status outside the known timeline] -> Keep status mapping isolated and render an unknown-status fallback without incorrectly marking progress.
- [Fetching directly from a bookmarked URL can fail or omit an ID] -> Define loading, missing-parameter, and request-error states with no empty or partially misleading order display.
