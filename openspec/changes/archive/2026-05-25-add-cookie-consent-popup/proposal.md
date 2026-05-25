## Why

The webshop currently provides no cookie consent prompt, so visitors cannot make an informed choice about non-essential cookie categories before use. A global consent popup is needed to expose those choices consistently across the site.

## What Changes

- Initialize `vanilla-cookieconsent` once in the global application experience so users can see and act on a cookie consent popup.
- Configure a read-only necessary category and an optional analytics category.
- Provide consent actions for accepting all cookies, accepting necessary cookies only, and managing preferences.
- Provide a preferences modal explaining necessary and analytics categories and allowing the user to save their selection.
- Supply localized consent copy for the webshop's supported languages and align the initial consent language with the current application locale.
- Load the library-provided cookie consent stylesheet for its modal UI.

## Capabilities

### New Capabilities

- `cookie-consent-popup`: Global cookie consent prompt, category preferences, translated content, and persisted consent choice behavior.

### Modified Capabilities

- None.

## Impact

- Affected code: global app layout or a dedicated globally mounted cookie-consent initializer component.
- Affected assets/styles: `vanilla-cookieconsent/dist/cookieconsent.css`.
- Affected localization: consent modal and preferences modal copy for Finnish, English, and Swedish.
- Dependencies: uses the existing `vanilla-cookieconsent` package already present in `package.json`.
- Affected tests: initializer configuration, globally mounted behavior, and language/category settings.
