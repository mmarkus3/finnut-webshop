## Context

The app already uses service classes and hooks for order, delivery, and payment related API calls. Campaign code lookup should follow the same pattern: keep axios/network access in service/helper layer and expose UI-friendly state via hook layer.

## Goals / Non-Goals

**Goals:**
- Provide a dedicated service method for campaign lookup by company + code.
- Provide hook abstraction for loading/error/data state management.
- Keep endpoint construction centralized and strongly typed.
- Ensure predictable behavior for empty/invalid input and network failures.

**Non-Goals:**
- Building complete campaign UI flow (input component, banner, checkout application logic).
- Backend changes to campaign API schema.
- Persisting campaign code selection across sessions.

## Decisions

- Implement campaign lookup in a dedicated service module (or existing service family if present).
Rationale: keeps network access and endpoint details isolated from UI logic.

- Implement hook with explicit trigger function (e.g. `fetchCampaignByCode`) rather than automatic fetch on every keystroke.
Rationale: user-entered codes should typically be validated/submitted intentionally to reduce unnecessary requests.

- Return normalized hook state: `{ campaign, isLoading, error, fetchCampaignByCode, reset }`.
Rationale: consistent with existing async hooks and straightforward for consuming components.

- Trim and validate code before request; do not call API for empty code.
Rationale: avoids avoidable backend calls and simplifies validation behavior.

## Risks / Trade-offs

- [Risk] Endpoint/path mismatch can silently fail. → Mitigation: add service tests asserting URL shape.
- [Risk] Hook consumers may forget to clear old error/data. → Mitigation: expose `reset` and set deterministic state transitions per request.
- [Risk] Future campaign response schema changes break typing. → Mitigation: keep API response interfaces localized and optional-field tolerant where needed.
