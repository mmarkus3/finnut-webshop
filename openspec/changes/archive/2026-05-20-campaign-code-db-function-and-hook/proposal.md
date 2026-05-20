## Why

The webshop needs a reusable way to fetch campaign data by a code entered by the user. Without a dedicated service and hook layer, campaign-code lookup logic risks being duplicated and inconsistent across screens.

## What Changes

- Add DB/service function(s) to fetch campaign details by campaign code from endpoint `apiUrl/campaigns/company/:company/campaign/:code`.
- Add React hook(s) that use the service function and expose loading, error, and result state for UI usage.
- Normalize request input (trim code) and enforce safe no-request behavior for empty codes.
- Add tests for service and hook behavior, including success, empty code, and error paths.

## Capabilities

### New Capabilities
- `campaign-code-lookup`: Fetch campaign payload for a company by user-provided campaign code through reusable service and hooks.

### Modified Capabilities
- None.

## Impact

- Affected code includes API helper/service modules and hooks under checkout/campaign-related flows.
- New tests required for service/hook behavior.
- No UI changes are required in this change unless needed for minimal integration wiring.
