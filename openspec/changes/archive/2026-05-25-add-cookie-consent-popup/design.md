## Context

The application renders shared global chrome from `app/_layout.tsx` and initializes i18next with Finnish, English, and Swedish resources. `vanilla-cookieconsent` is already listed as a dependency, but it is not initialized and its stylesheet is not loaded, so no cookie consent interaction exists today.

## Goals / Non-Goals

**Goals:**

- Initialize cookie consent once for the globally rendered webshop experience.
- Use `vanilla-cookieconsent` and its provided stylesheet.
- Expose required necessary cookies and opt-in analytics preferences.
- Configure translated modal and preferences content for `fi`, `en`, and `sv`.
- Use the application's active language when showing consent content.

**Non-Goals:**

- Adding analytics trackers or changing script loading based on analytics consent.
- Building a custom cookie preference modal outside the library.
- Adding a full cookie policy document or new information-page content.
- Changing application data models or API requests.

## Decisions

- Create a small globally mounted cookie consent initializer component that calls `CookieConsent.run()` in `useEffect`. This isolates the browser-side library integration from navigation/layout code and keeps it testable.
- Mount the initializer beneath the root providers in `app/_layout.tsx`, so it runs once for all application pages without duplicating modal instances.
- Configure `necessary` as `enabled: true` and `readOnly: true`, with `analytics` optional, matching common consent semantics and the supplied configuration model.
- Provide library translations directly in consent configuration for each supported app language. The library owns its modal text, while the language selection should derive from current i18next language.
- Import `vanilla-cookieconsent/dist/cookieconsent.css` alongside the initializer or global web styling entry so the library modal receives required presentation.

## Risks / Trade-offs

- The package targets browser DOM APIs while Expo also supports native platforms -> initialize only in compatible web runtime or ensure tests/native rendering do not execute unsupported browser code.
- The app language can change after initial consent initialization -> initialize using current startup language; dynamic modal language refresh can be added if application language switching becomes user-facing.
- Analytics preferences do not yet gate a tracker -> retain the category for consent readiness without claiming analytics behavior is active.
