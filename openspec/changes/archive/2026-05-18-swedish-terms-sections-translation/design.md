## Context

Information page terms are loaded from i18n keys by locale. English terms are now fully localized, while Swedish content still mirrors non-Swedish wording. The requested change is to translate Swedish terms section content from the English source.

## Goals / Non-Goals

**Goals:**
- Provide full Swedish terms content for `sv` locale.
- Keep section hierarchy equivalent to English legal structure.
- Preserve information-page rendering behavior and readability.
- Add verification for representative Swedish content.

**Non-Goals:**
- Changing English or Finnish terms in this change.
- Altering information page layout or navigation.
- Rewriting legal scope beyond translation.

## Decisions

- Update only `i18n/sv/translation.json` under `information.termsTitle` and `information.termsSections`.
Rationale: minimizes change scope and isolates locale-specific content work.

- Keep same section count/order as English source.
Rationale: helps maintain parity and easier future legal updates across locales.

- Verify with focused tests for Swedish heading and sample paragraphs.
Rationale: guards against fallback/incorrect locale content.

## Risks / Trade-offs

- [Risk] Legal nuance may drift in translation. -> Mitigation: preserve structure and meaning from approved English text and keep wording explicit.
- [Trade-off] Large translated text in JSON remains verbose. -> Mitigation: keep content grouped by sections for maintainability.
