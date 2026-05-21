## Context

Three hooks currently instantiate axios clients independently (`deliveryPoints`, `deliveryPricing`, `paymentMethods`). The requested constraint is to keep axios imports only in a shared helper and have hooks consume that helper.

## Goals / Non-Goals

**Goals:**
- Introduce a shared HTTP helper where axios is imported and used.
- Remove axios imports from target hooks.
- Preserve endpoint URLs, params, and normalization behavior.
- Keep testability by allowing dependency injection/mocking at helper boundary.

**Non-Goals:**
- Rewriting unrelated services that already use `RestService` abstraction.
- Changing API contracts or response schemas.
- Broad network-layer redesign beyond these hooks.

## Decisions

- Add a helper module (e.g. `hooks/httpFetch.ts` or `services/httpFetch.ts`) exposing generic GET request utility and optional client factory wrappers.
Rationale: centralizes axios usage in one place and keeps hooks lightweight.

- Keep hook-level data normalization where domain mapping belongs.
Rationale: networking and domain mapping stay separated; behavior stays stable.

- Preserve current function signatures where feasible; for testability, allow passing helper/request function override similar to current client injection patterns.
Rationale: minimizes test churn and supports deterministic unit tests.

## Risks / Trade-offs

- [Risk] Refactor could alter subtle request config behavior. -> Mitigation: keep exact URL/params mapping and validate with existing tests.
- [Trade-off] One helper becomes common dependency across hooks. -> Mitigation: keep helper small, generic, and well-scoped.
