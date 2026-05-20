## Context

Country context is now used in product and delivery price fetches. Delivery points fetch still uses postal code only, which can return inconsistent results across countries. This change aligns delivery points requests with existing country-aware fetch patterns.

## Goals / Non-Goals

**Goals:**
- Include `country` query parameter in pickup point requests.
- Reuse centralized country resolver for consistency.
- Keep current top-10 limiting and empty-postal-code fast return logic unchanged.

**Non-Goals:**
- Changing pickup point sorting/ranking logic.
- Changing checkout UI behavior for selecting points.
- Supporting dynamic per-request country override in UI.

## Decisions

- Resolve country via shared helper, not direct env reads in delivery points hook.
Rationale: avoids config drift and simplifies testing.

- Include country in `params` alongside postalCode.
Rationale: explicit API request shape and backward-compatible helper signature.

- Keep existing normalization of postal code and output mapping unchanged.
Rationale: scope focuses only on request context.

## Risks / Trade-offs

- [Risk] Existing tests assert old request params. → Mitigation: update tests to include country param.
- [Risk] Backend may ignore country silently for some postal codes. → Mitigation: still safe; request remains compatible.
