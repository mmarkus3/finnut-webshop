## Why

The information-page link currently renders as a global fixed/footer-like element in shared layout. The requested behavior is that the link should be part of normal page flow (appended to page content) instead of fixed/global placement.

## What Changes

- Move information-page link rendering from root layout-level global placement to in-page appended placement.
- Ensure the link appears after page content in normal scroll flow.
- Preserve existing navigation behavior and visual styling intent.
- Update tests to validate appended-flow rendering behavior.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `information-page-global-footer-link`: Change link placement requirement from global fixed/footer area to appended in-page flow placement.

## Impact

- Affected layout: `app/_layout.tsx` and page composition.
- Affected shared component usage: `GlobalBottomInfoLink` placement/integration.
- Affected tests: visibility/placement behavior checks.
