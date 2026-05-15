## MODIFIED Requirements

### Requirement: Product cards SHALL use deterministic image fallback
The system SHALL display the first product image for each product card with full-image visibility, and SHALL use a placeholder image when the product has no available images.

#### Scenario: Product with images uses first image
- **WHEN** a product has one or more image URLs
- **THEN** the product card displays the first image in the product image list with full-image visibility

#### Scenario: Product without images uses placeholder
- **WHEN** a product has no image URLs
- **THEN** the product card displays the configured placeholder image instead of an empty or broken image area
