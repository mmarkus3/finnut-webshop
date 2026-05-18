# information-page-global-footer-link Specification

## Purpose
TBD - created by archiving change information-page-with-global-bottom-link. Update Purpose after archive.
## Requirements
### Requirement: System SHALL provide a dedicated information page
The system SHALL expose a navigable information page route with heading/content text for webshop/company information and full delivery terms.

#### Scenario: User opens information page
- **WHEN** user navigates to the information page route
- **THEN** the page renders the delivery terms title "Toimitusehdot" and full terms content sections including contact details, ordering, payment provider, payment methods, delivery, returns, and cancellation/complaints information

### Requirement: System SHALL show global bottom information link area on all pages
The system SHALL append an information-page link area to page content flow on all core app pages, rather than rendering it as a fixed/global layout footer element.

#### Scenario: Bottom information link is appended in page flow
- **WHEN** user scrolls through a page using shared app chrome
- **THEN** information-page link area appears after page content within normal scroll flow

### Requirement: Bottom information link area SHALL match header background color
The system SHALL style the global bottom link area with the same background color used by header background.

#### Scenario: Bottom area background visually matches header
- **WHEN** app layout is rendered
- **THEN** bottom information link area uses the header background color token/value

