## Context

The cart provider currently initializes from an in-memory `initialCartState` and never writes to persistent storage. On web refresh or app restart, all items are lost. This change adds persistence while maintaining existing reducer-driven behavior and derived selectors.

## Goals / Non-Goals

**Goals:**
- Load cart state from local storage during provider initialization.
- Persist cart state to local storage after cart mutations.
- Gracefully handle malformed or incompatible stored payloads.
- Keep current cart interactions and pricing logic unchanged.

**Non-Goals:**
- Cross-device cart sync.
- Backend cart persistence.
- Migration of historical cart schema versions beyond basic compatibility checks.

## Decisions

- Use a dedicated storage key constant for cart state payload.
- Use a hydrate action or lazy initializer to seed reducer state from storage.
- Validate stored data shape minimally (items object with product+quantity) before applying.
- On read/parse failure, fall back to empty cart and optionally clear invalid payload.
- Persist state in an effect when `state.items` changes.

## Risks / Trade-offs

- [Risk] Async hydration may cause a brief empty cart render before restore. -> Mitigation: optionally expose hydration status or defer render when needed.
- [Risk] Stored payload can be stale vs current product stock. -> Mitigation: keep existing quantity clamping on cart mutations; consider follow-up stock reconciliation.
- [Trade-off] Local-only persistence improves UX quickly but does not support multi-device continuity.
