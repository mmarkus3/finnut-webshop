## Why

Cart summary currently emphasizes item subtotal and delivery separately, but the final summary amount should reflect what the user pays including delivery when delivery cost is known. This improves pricing clarity before checkout.

## What Changes

- Update cart summary total calculation to include delivery price in the final summary amount.
- Keep existing behavior for unknown delivery costs (placeholder state remains).
- Ensure summary lines remain consistent between cart and checkout summary sections where shared logic applies.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `shopping-cart-management`: Summary total requirements are updated so final cart summary amount equals item subtotal plus delivery cost when delivery cost is available.

## Impact

- Affected code includes cart summary total calculation and related helper logic.
- Existing cart/checkout summary tests need updates to reflect new total behavior.
- No backend API changes are required.
