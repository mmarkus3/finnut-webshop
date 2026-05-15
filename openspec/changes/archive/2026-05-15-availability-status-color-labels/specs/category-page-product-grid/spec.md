## MODIFIED Requirements

### Requirement: Product cards SHALL include required product metadata
The system SHALL display product image, product name, price, threshold-based availability status label, and description preview for each product card in the category grid.

#### Scenario: Product card displays required fields
- **WHEN** a product card is rendered in the category grid
- **THEN** the card shows product image, product name, product price, threshold-based availability status label, and description text

#### Scenario: Description preview is limited to three lines
- **WHEN** a product description exceeds three lines of text
- **THEN** the card truncates the description preview to a maximum of three lines
