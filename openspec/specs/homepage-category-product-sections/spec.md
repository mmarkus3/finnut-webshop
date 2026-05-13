## ADDED Requirements

### Requirement: Home page SHALL render category product sections
The system SHALL display category sections on the home page where each section includes a category name and a product carousel directly underneath.

#### Scenario: Category sections appear with carousels
- **WHEN** the home page loads with categories and products available
- **THEN** each category section is rendered with its category name and a horizontal carousel of products that belong to that category

### Requirement: Product cards SHALL use deterministic image fallback
The system SHALL display the first product image for each product card, and SHALL use a placeholder image when the product has no available images.

#### Scenario: Product with images uses first image
- **WHEN** a product has one or more image URLs
- **THEN** the product card displays the first image in the product image list

#### Scenario: Product without images uses placeholder
- **WHEN** a product has no image URLs
- **THEN** the product card displays the configured placeholder image instead of an empty or broken image area

### Requirement: Category-product grouping SHALL be correct
The system SHALL group products under the matching category section using the existing category mapping field used in the catalog data model.

#### Scenario: Products appear under their matching category
- **WHEN** products include category identifiers that match loaded categories
- **THEN** those products appear only in the carousel for their matching category section

### Requirement: Carousels SHALL remain accessible and responsive
The system SHALL keep category sections and product carousels usable across supported screen sizes and accessible interaction modes.

#### Scenario: Carousel works on narrow screens
- **WHEN** the home page is viewed on a narrow mobile viewport
- **THEN** users can horizontally scroll each category's product carousel to reach all visible products in that section

#### Scenario: Product cards are accessible interactive elements
- **WHEN** users navigate with keyboard or assistive technology
- **THEN** product cards in each carousel are focusable and exposed with meaningful accessibility labels
