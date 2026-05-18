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

### Requirement: Footer SHALL include centered social media links row
The system SHALL render a dedicated footer row for social media links that is centered horizontally and separate from the information-page link row.

#### Scenario: Social links render on their own centered row
- **WHEN** footer content is displayed at page end
- **THEN** Instagram and Facebook links are shown on a separate centered row

### Requirement: Footer social links SHALL open configured external URLs
The system SHALL route social link taps to configured external destinations.

#### Scenario: Instagram and Facebook links open target pages
- **WHEN** user taps Instagram or Facebook link in footer
- **THEN** app opens `https://www.instagram.com/goodhabitsnacks/` for Instagram and `https://www.facebook.com/goodhabitsnacks` for Facebook

