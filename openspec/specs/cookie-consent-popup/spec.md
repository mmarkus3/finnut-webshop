## Requirements

### Requirement: Webshop SHALL show a global cookie consent prompt
The system SHALL initialize a cookie consent experience for visitors using `vanilla-cookieconsent` on the globally rendered webshop experience.

#### Scenario: Consent prompt is available on first site visit
- **WHEN** a visitor loads a webshop page before recording a consent choice
- **THEN** the system displays a cookie consent modal
- **AND** the modal provides actions to accept all cookies, accept necessary cookies only, or manage preferences

#### Scenario: Stored consent prevents repeated first-choice prompt
- **WHEN** a visitor has already recorded a consent choice through the consent library
- **THEN** the library retains that choice according to its persisted consent behavior
- **AND** the initial consent prompt is not unnecessarily shown again

### Requirement: Cookie consent SHALL expose necessary and analytics categories
The system SHALL configure a necessary cookie category that cannot be disabled and an analytics cookie category that visitors can choose.

#### Scenario: Necessary category is mandatory
- **WHEN** a visitor opens cookie preferences
- **THEN** necessary cookies are enabled and read-only

#### Scenario: Analytics category is optional
- **WHEN** a visitor opens cookie preferences
- **THEN** analytics consent is presented as an optional category whose selection can be saved

### Requirement: Cookie consent content SHALL be localized
The system SHALL provide cookie consent modal and preferences modal content in Finnish, English, and Swedish and SHALL initially show content in the active application language.

#### Scenario: Finnish consent content is selected
- **WHEN** the application language is Finnish when cookie consent initializes
- **THEN** consent modal buttons, headings, and category explanations are displayed in Finnish

#### Scenario: English or Swedish consent content is selected
- **WHEN** the application language is English or Swedish when cookie consent initializes
- **THEN** consent modal buttons, headings, and category explanations are displayed in the corresponding language

### Requirement: Cookie consent UI SHALL load library presentation assets
The system SHALL load the `vanilla-cookieconsent` stylesheet used to render the cookie consent and preferences modals.

#### Scenario: Modal presentation is styled
- **WHEN** the cookie consent modal renders
- **THEN** `vanilla-cookieconsent/dist/cookieconsent.css` styles are applied to the rendered consent interface
