## Context

Information page renders terms content from i18n keys (`information.termsTitle`, `information.termsSections`). English currently uses Finnish legal text, which is not suitable for English users. Requested change provides full English legal text.

## Goals / Non-Goals

**Goals:**
- Render provided English terms and conditions text when locale is English.
- Preserve sectioned, scrollable layout for readability.
- Keep Finnish and Swedish content untouched.
- Add test coverage for representative English content.

**Non-Goals:**
- Altering information page layout or footer links.
- Revising legal meaning/wording of provided English text.
- Introducing locale-detection changes.

## Decisions

- Update only `i18n/en/translation.json` terms title/sections.
Rationale: smallest possible change to satisfy locale-specific content requirement.

- Keep existing section-paragraph structure used by information page.
Rationale: no component rewrite needed; structure already supports long legal text.

- Add/update tests to assert English heading and representative paragraph values.
Rationale: protects against accidental regression to non-English content.

## Risks / Trade-offs

- [Risk] Large legal text in JSON is harder to maintain. -> Mitigation: keep organized in section blocks and verify via tests.
- [Trade-off] No additional typography changes for legal text. -> Mitigation: current readable layout is retained.
