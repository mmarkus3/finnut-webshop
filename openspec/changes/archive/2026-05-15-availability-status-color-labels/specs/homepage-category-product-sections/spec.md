## MODIFIED Requirements

### Requirement: Product cards SHALL expose the same core product information as category page cards
The system SHALL display product name, price, availability status, and description preview in each home page product card so product information is consistent with category page cards.

#### Scenario: Home product card shows required metadata fields
- **WHEN** a product card is rendered in a home category section carousel
- **THEN** the card shows product name, product price, threshold-based availability status label, and product description preview

#### Scenario: Home description preview is capped
- **WHEN** a home product description exceeds three lines of text
- **THEN** the card truncates the description preview to a maximum of three lines
