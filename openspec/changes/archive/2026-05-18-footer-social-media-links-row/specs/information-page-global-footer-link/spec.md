## ADDED Requirements

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
