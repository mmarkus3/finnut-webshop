## MODIFIED Requirements

### Requirement: Product cards SHALL expose the same core product information as category page cards
The system SHALL display product name, price, availability amount, and description preview in each home page product card so product information is consistent with category page cards, and the category product row SHALL remain horizontally scrollable on small screens.

#### Scenario: Home product card shows required metadata fields
- **WHEN** a product card is rendered in a home category section carousel
- **THEN** the card shows product name, product price, availability amount, and product description preview

#### Scenario: Home description preview is capped
- **WHEN** a home product description exceeds three lines of text
- **THEN** the card truncates the description preview to a maximum of three lines

#### Scenario: Small-screen row remains horizontally scrollable
- **WHEN** home category section is rendered on a small screen
- **THEN** users can horizontally scroll the row to access additional product cards
