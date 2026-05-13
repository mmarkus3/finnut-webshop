## ADDED Requirements

### Requirement: Category page SHALL show category name as title
The system SHALL display the selected category's display name as the category page title.

#### Scenario: Category name is resolved from selected category
- **WHEN** the user opens a category page with a valid category identifier
- **THEN** the title displays the matching category's name

### Requirement: Category page SHALL render all matching products in a responsive grid
The system SHALL render all products belonging to the selected category in a responsive grid that adapts by viewport size.

#### Scenario: Desktop grid shows four products per row
- **WHEN** the category page is viewed in desktop viewport
- **THEN** the grid renders products in rows of four cards

#### Scenario: Mobile grid shows one product per row
- **WHEN** the category page is viewed in mobile viewport
- **THEN** the grid renders one product card per row

#### Scenario: Only matching category products are shown
- **WHEN** products include category identifiers
- **THEN** the grid includes all and only products whose category identifier matches the selected category

### Requirement: Product cards SHALL include required product metadata
The system SHALL display product name, price, availability amount, and description preview for each product card in the category grid.

#### Scenario: Product card displays required fields
- **WHEN** a product card is rendered in the category grid
- **THEN** the card shows product name, product price, product amount availability, and description text

#### Scenario: Description preview is limited to three lines
- **WHEN** a product description exceeds three lines of text
- **THEN** the card truncates the description preview to a maximum of three lines
