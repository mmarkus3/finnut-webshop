## Why

Cart contents are currently lost on refresh, which interrupts shopping and creates friction during checkout preparation. Persisting cart state locally ensures users can continue where they left off across app reloads.

## What Changes

- Persist cart state in client local storage whenever cart contents change.
- Restore cart state from local storage when cart provider initializes.
- Add safe fallback behavior for missing/invalid/corrupted stored cart data.
- Keep existing cart reducer logic and UX unchanged apart from persistence.

## Capabilities

### New Capabilities
- `cart-local-persistence`: Defines save/restore behavior for cart state using local storage.

### Modified Capabilities
- `shopping-cart-management`: Cart lifecycle is extended so state survives app refresh by restoring saved cart items.

## Impact

- Affected code: `hooks/cart.tsx` and potential storage utility/helpers.
- Dependencies: likely introduces AsyncStorage or equivalent storage adapter for Expo/React Native.
- Testing: add reducer/provider tests for hydrate/save behavior and invalid storage payload handling.
