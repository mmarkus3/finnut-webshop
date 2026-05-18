## Context

The information page exists and is reachable from a global bottom link, but its content is currently a brief placeholder. The requested change is to show full delivery terms text in Finnish exactly as provided by business.

## Goals / Non-Goals

**Goals:**
- Display complete delivery terms on information page.
- Preserve readability for long legal text on mobile and desktop.
- Keep implementation within existing info page route and localization setup.
- Add verification to prevent accidental content regression.

**Non-Goals:**
- Translating the provided Finnish legal text to other languages in this change.
- Building CMS/editor tooling for legal content updates.
- Changing global link placement or route structure.

## Decisions

- Store terms content in i18n keys dedicated to information page terms.
Rationale: Aligns with project localization approach and avoids hard-coded strings inside component logic.

- Render terms as structured sections (title + paragraph blocks) in scrollable container.
Rationale: Improves readability and keeps legal text maintainable.

- Keep current information page route/component and only replace content rendering.
Rationale: Minimal surface-area change with lower regression risk.

## Risks / Trade-offs

- [Risk] Very long static text can become hard to maintain in translation JSON. -> Mitigation: keep content grouped under dedicated keys and validate formatting in tests.
- [Trade-off] Finnish-only legal text in all locales for now. -> Mitigation: implement exact requested text now; add locale-specific legal copy in follow-up.
