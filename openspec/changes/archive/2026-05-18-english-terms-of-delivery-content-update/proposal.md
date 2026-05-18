## Why

The English information page currently shows Finnish terms text. English-speaking users need complete terms and conditions in English to understand ordering, payment, shipping, returns, and complaint policies.

## What Changes

- Replace English (`en`) terms-of-delivery content on information page with provided English text.
- Keep existing section structure and readability for long legal text.
- Preserve Finnish and Swedish terms content unchanged in this change.
- Add/update tests to verify representative English terms content renders.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `information-page-global-footer-link`: Update information page behavior so English locale renders full English terms and conditions content.

## Impact

- Affected i18n: `i18n/en/translation.json` under `information.termsTitle` and `information.termsSections`.
- Affected UI: information page content shown for English locale.
- Affected tests: information page rendering assertions for English terms text.
