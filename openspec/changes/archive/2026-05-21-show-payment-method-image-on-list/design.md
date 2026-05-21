## Context

Checkout already fetches payment methods from the company-scoped endpoint and renders them as selectable rows in `CheckoutPage`. The `PaymentMethod` type already carries an `img` value normalized from the API payload, so the main implementation work is to render that existing field in the list without changing the endpoint contract or checkout step flow.

## Goals / Non-Goals

**Goals:**

- Render each payment method image next to its name when `method.img` is available.
- Preserve the existing selectable row behavior, selected styling, and accessibility label text.
- Keep rows visually stable when `img` is blank or an image cannot be displayed.
- Cover image normalization and list rendering with focused Jest tests.

**Non-Goals:**

- Changing the payment methods API shape or introducing new payment provider data.
- Persisting the selected payment method to an order.
- Reworking the full checkout layout or payment-step navigation.

## Decisions

- Use React Native's built-in `Image` component for remote payment-method images. This avoids adding dependencies and matches the current Expo/React Native stack.
- Render the image as a fixed-size thumbnail inside the existing `Pressable` row, with the method name remaining visible as text. This keeps accessibility and scanability intact.
- Treat `img` as optional at render time even though the normalized type uses a string, so blank values simply produce text-only rows rather than broken image placeholders.
- Keep image rendering local to `CheckoutPage` because this is the only current consumer of payment-method list presentation. A reusable component can be extracted later if another payment-method surface appears.

## Risks / Trade-offs

- Remote image URLs may fail or load slowly → keep the method name visible and do not make selection depend on image loading.
- Provider logos may vary in aspect ratio → use fixed bounds and resize containment so rows do not jump or crop important logo details.
- Some existing tests may use payment method fixtures without `img` → keep fallback behavior compatible and update only tests that need to assert the new image path.
