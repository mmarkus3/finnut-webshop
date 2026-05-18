## Context

Checkout now fetches delivery points and allows user selection, but selected value is currently local UI state. Active order already exists by this stage, so saving `deliveryMethod` to backend is a targeted order update concern.

## Goals / Non-Goals

**Goals:**
- Save selected delivery method id to active order in backend.
- Ensure update uses current active order id.
- Show recoverable error if update fails.

**Non-Goals:**
- Final order placement/payment step.
- Persisting additional delivery metadata beyond selected id in this change.

## Decisions

- Trigger order update when user selects a delivery method.
- Use existing order service update pathway (`save`/`patch`) with `deliveryMethod` field.
- Keep local selected state, but only mark selection as persisted after successful backend update.
- Prevent duplicate in-flight updates for rapid repeated taps.

## Risks / Trade-offs

- [Risk] Race conditions on fast selection changes. -> Mitigation: in-flight lock and last-write strategy.
- [Risk] Missing/stale active order id. -> Mitigation: guard and show error with retry path.
