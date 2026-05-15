## Context

Checkout currently captures customer information and shows summary but does not let user choose a delivery point. Postal code is already part of customer input, making it a natural query key for point search.

## Goals / Non-Goals

**Goals:**
- Trigger delivery-point fetch after postal code is available.
- Query points endpoint with entered postal code.
- Show maximum 10 selectable delivery points.
- Store selected point in checkout state for next checkout step.

**Non-Goals:**
- Final payment submission.
- Advanced map UI for points.
- Multi-query caching optimization beyond basic UX.

## Decisions

- Add a checkout delivery-points fetch helper using base API + company route.
- Validate postal code before request; avoid fetching for empty/invalid postal code.
- Normalize response to UI-friendly point model and slice first 10 entries.
- Render selectable list (single-choice) with clear selected state marker.
- Expose loading, error, and no-results messaging in checkout UI.

## Risks / Trade-offs

- [Risk] Endpoint response schema may differ from assumptions. -> Mitigation: defensive mapping with optional fields and fallback labels.
- [Risk] Frequent fetches while typing postal code. -> Mitigation: trigger on explicit action or debounce.
- [Trade-off] List-based point selection is simple and fast, but less visual than map-based UX.
