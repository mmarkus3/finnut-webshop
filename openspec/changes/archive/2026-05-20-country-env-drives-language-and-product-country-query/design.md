## Context

Language and product currency behavior currently rely on locale/currency formatting choices that are not explicitly tied to deployment country env. We need one country source of truth from environment and deterministic fallback behavior.

## Goals / Non-Goals

**Goals:**
- Resolve country from `EXPO_PUBLIC_COUNTRY` with fallback to `FI`.
- Set default app language to Swedish when country resolves to `SE`.
- Include `country` query param in product fetch calls.
- Keep behavior deterministic for missing/invalid env values.

**Non-Goals:**
- Geolocation-based country detection.
- Dynamic per-user country switching in this change.
- Backend pricing/business-rule changes.

## Decisions

- Add a small shared config helper for country resolution and normalization (`FI`/`SE`).
Rationale: avoids duplicating env parsing across hooks and i18n setup.

- Apply country-driven default language at i18n initialization boundary.
Rationale: keeps startup behavior centralized and testable.

- Pass `country` query in product fetch helper/service layer, not in UI components.
Rationale: keeps API concerns out of presentation and ensures consistent requests.

- Unknown country values fallback to FI behavior.
Rationale: safe default with existing compatibility.

## Risks / Trade-offs

- [Risk] Existing tests may implicitly expect hardcoded defaults. → Mitigation: update tests with explicit country setup.
- [Risk] Multiple places reading env directly can diverge. → Mitigation: migrate to shared resolver helper.
- [Risk] Language persistence/localStorage may override default language in some flows. → Mitigation: ensure default only applies when no explicit user language is set.
