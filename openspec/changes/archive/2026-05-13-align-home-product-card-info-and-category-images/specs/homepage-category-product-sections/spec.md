## MODIFIED Requirements

### Requirement: Product cards SHALL use deterministic image fallback
The system SHALL display the first product image for each product card, and SHALL use a placeholder image when the product has no available images.

#### Scenario: Product with images uses first image
- **WHEN** a product has one or more image URLs
- **THEN** the product card displays the first image in the product image list

#### Scenario: Product without images uses placeholder
- **WHEN** a product has no image URLs
- **THEN** the product card displays the configured placeholder image instead of an empty or broken image area

### Requirement: Product cards SHALL expose the same core product information as category page cards
The system SHALL display product name, price, availability amount, and description preview in each home page product card so product information is consistent with category page cards.

#### Scenario: Home product card shows required metadata fields
- **WHEN** a product card is rendered in a home category section carousel
- **THEN** the card shows product name, product price, availability amount, and product description preview

#### Scenario: Home description preview is capped
- **WHEN** a home product description exceeds three lines of text
- **THEN** the card truncates the description preview to a maximum of three lines
