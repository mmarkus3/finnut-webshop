# category-page-product-grid Specification

## Purpose
Define required product card content and image behavior for the category page grid.
## Requirements
### Requirement: Product cards SHALL include required product metadata
The system SHALL display product image, product name, price, availability amount, and description preview for each product card in the category grid.

#### Scenario: Product card displays required fields
- **WHEN** a product card is rendered in the category grid
- **THEN** the card shows product image, product name, product price, product amount availability, and description text

#### Scenario: Description preview is limited to three lines
- **WHEN** a product description exceeds three lines of text
- **THEN** the card truncates the description preview to a maximum of three lines

### Requirement: Category page product cards SHALL use deterministic image fallback
The system SHALL display the first product image for each category page product card, and SHALL use a fallback placeholder image when the product has no available images or the first image is unusable.

#### Scenario: Category product with images uses first image
- **WHEN** a category page product has one or more valid image URLs
- **THEN** the card displays the first product image

#### Scenario: Category product without usable image uses fallback
- **WHEN** a category page product has no image URLs or an unusable first image value
- **THEN** the card displays the configured fallback image instead of an empty or broken image area

### Requirement: Category grid price SHALL include localized currency
The system SHALL display category grid product prices with locale-specific currency markers.

#### Scenario: Category grid price includes locale currency
- **WHEN** a category page product card renders a price
- **THEN** the price text includes `€` for Finnish locale and `SEK` for Swedish locale

