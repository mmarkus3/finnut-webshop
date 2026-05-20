## Context

Country resolution already exists for other pricing-related fetches. Delivery pricing currently fetches without country query context. We should reuse the same resolver to ensure consistent country handling.

## Goals / Non-Goals

**Goals:**
- Include `country` query parameter in delivery pricing API calls.
- Reuse shared country resolver for deterministic FI/SE behavior.
- Preserve existing handling for invalid response payloads.

**Non-Goals:**
- Changing delivery pricing calculations themselves.
- Introducing runtime country switching UI.
- Altering delivery banner copy logic.

## Decisions

- Use existing shared country resolver helper rather than reading env directly in delivery hook.
Rationale: keeps country logic centralized and consistent.

- Attach country via request `params` on delivery pricing fetch.
Rationale: explicit and testable API contract.

- Keep provider state transitions unchanged.
Rationale: scope is request context only.

## Risks / Trade-offs

- [Risk] Backend may ignore unknown country values silently. → Mitigation: resolver restricts to supported values with fallback.
- [Risk] Tests may still assert old request shape. → Mitigation: update delivery pricing fetch tests to include `country` param.
