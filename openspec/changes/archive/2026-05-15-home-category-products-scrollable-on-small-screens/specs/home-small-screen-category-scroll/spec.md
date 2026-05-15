## ADDED Requirements

### Requirement: Home Category Rows SHALL Be Scrollable On Small Screens
The system SHALL allow users on small screens to horizontally scroll category product rows on the home page.

#### Scenario: Small-screen category row supports horizontal scrolling
- **WHEN** home category products are viewed on a small screen
- **THEN** user can horizontally scroll to browse products beyond the initially visible cards

### Requirement: Small-Screen Scrollability SHALL Preserve Card Interaction
The system SHALL preserve product card press behavior while horizontal row scrolling is enabled.

#### Scenario: Card selection still works within scrollable row
- **WHEN** user taps a product card inside the scrollable row
- **THEN** the product card interaction behaves as expected (e.g. navigation to product page)
