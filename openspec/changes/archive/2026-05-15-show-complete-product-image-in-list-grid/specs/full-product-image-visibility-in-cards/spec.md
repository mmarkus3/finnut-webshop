## ADDED Requirements

### Requirement: Card Images SHALL Render Full Product Image
The system SHALL render full product images in product cards without cropping essential image content.

#### Scenario: Full image visible in home list card
- **WHEN** a product card is displayed on home category product list
- **THEN** the full product image is visible within the card image area

#### Scenario: Full image visible in category grid card
- **WHEN** a product card is displayed on category page grid
- **THEN** the full product image is visible within the card image area

### Requirement: Full-Image Rendering SHALL Preserve Fallback Behavior
The system SHALL preserve placeholder fallback behavior for missing product images.

#### Scenario: Missing image uses placeholder with full-image rendering
- **WHEN** product has no usable image source
- **THEN** placeholder image is shown and remains fully visible within card image area
