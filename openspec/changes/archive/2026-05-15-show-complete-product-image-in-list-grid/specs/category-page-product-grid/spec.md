## MODIFIED Requirements

### Requirement: Category page product cards SHALL use deterministic image fallback
The system SHALL display the first product image for each category page product card with full-image visibility, and SHALL use a fallback placeholder image when the product has no available images or the first image is unusable.

#### Scenario: Category product with images uses first image
- **WHEN** a category page product has one or more valid image URLs
- **THEN** the card displays the first product image with full-image visibility

#### Scenario: Category product without usable image uses fallback
- **WHEN** a category page product has no image URLs or an unusable first image value
- **THEN** the card displays the configured fallback image instead of an empty or broken image area
