## MODIFIED Requirements

### Requirement: Product cards SHALL expose the same core product information as category page cards
The system SHALL display product name, price, availability amount, and description preview in each home page product card so product information is consistent with category page cards, and SHALL expose a section-level "Show all" navigation action to the full category listing.

#### Scenario: Home product card shows required metadata fields
- **WHEN** a product card is rendered in a home category section carousel
- **THEN** the card shows product name, product price, availability amount, and product description preview

#### Scenario: Home description preview is capped
- **WHEN** a home product description exceeds three lines of text
- **THEN** the card truncates the description preview to a maximum of three lines

#### Scenario: Section header show-all action navigates to category page
- **WHEN** a user activates the section-level "Show all" action
- **THEN** the system navigates to that section's category listing page
