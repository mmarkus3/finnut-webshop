## 1. Service Layer

- [x] 1.1 Add campaign service function for GET `apiUrl/campaigns/company/:company/campaign/:code`.
- [x] 1.2 Add campaign request/response typing and safe input normalization for campaign code.

## 2. Hook Layer

- [x] 2.1 Add hook for campaign lookup by code exposing loading/data/error state.
- [x] 2.2 Ensure hook provides deterministic behavior for empty code and request reset.

## 3. Verification

- [x] 3.1 Add/update tests for service URL construction and success/error behavior.
- [x] 3.2 Add/update tests for hook state transitions (success, error, empty code).
- [x] 3.3 Run relevant Jest suites and confirm no regressions.
