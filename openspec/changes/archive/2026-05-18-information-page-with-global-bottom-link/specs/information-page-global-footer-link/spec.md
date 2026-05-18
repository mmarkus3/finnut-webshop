## ADDED Requirements

### Requirement: System SHALL provide a dedicated information page
The system SHALL expose a navigable information page route with localized title/content text for general webshop/company information.

#### Scenario: User opens information page
- **WHEN** user navigates to the information page route
- **THEN** the page renders localized heading and informational body content

### Requirement: System SHALL show global bottom information link area on all pages
The system SHALL render a bottom area across app pages that includes a link to the information page.

#### Scenario: Bottom information link is visible globally
- **WHEN** user views any app page using shared layout
- **THEN** a bottom area with information-page link is visible

### Requirement: Bottom information link area SHALL match header background color
The system SHALL style the global bottom link area with the same background color used by header background.

#### Scenario: Bottom area background visually matches header
- **WHEN** app layout is rendered
- **THEN** bottom information link area uses the header background color token/value
