## MODIFIED Requirements

### Requirement: Product cards SHALL include required product metadata
The system SHALL display product image, product name, price, availability amount, and description preview for each product card in the category grid, and SHALL render description preview inside a fixed-size container.

#### Scenario: Product card displays required fields
- **WHEN** a product card is rendered in the category grid
- **THEN** the card shows product image, product name, product price, product amount availability, and description text

#### Scenario: Description preview is limited to three lines
- **WHEN** a product description exceeds three lines of text
- **THEN** the card truncates the description preview to a maximum of three lines

#### Scenario: Category card description uses fixed-size container
- **WHEN** category product cards with varying description lengths are rendered
- **THEN** each card reserves the same description container height
