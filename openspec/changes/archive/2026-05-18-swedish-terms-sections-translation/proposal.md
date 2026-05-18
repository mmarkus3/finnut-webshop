## Why

Swedish locale currently does not provide Swedish delivery terms content equivalent to the English legal text. Swedish-speaking users should be able to read full terms in Swedish.

## What Changes

- Translate `information.termsSections` content to Swedish based on the approved English terms text.
- Update Swedish terms heading to Swedish equivalent.
- Keep section structure and legal scope aligned with English source.
- Add/update tests to verify Swedish representative terms content renders.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `information-page-global-footer-link`: Extend locale behavior so Swedish locale renders full Swedish terms and conditions content.

## Impact

- Affected i18n: `i18n/sv/translation.json` terms heading and sections.
- Affected UI: information page content when language is Swedish.
- Affected tests: information-page rendering assertions for Swedish content.
