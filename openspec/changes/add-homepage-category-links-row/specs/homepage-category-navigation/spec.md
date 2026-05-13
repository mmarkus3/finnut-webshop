## ADDED Requirements

### Requirement: Home page SHALL expose category links at the top
The system SHALL render a row of category links in the top section of the home page so users can start browsing by category immediately.

#### Scenario: Category links are shown on home page load
- **WHEN** the user opens the home page and category data is available
- **THEN** the home page displays a row of links representing available categories in the top section

#### Scenario: Category row handles many categories
- **WHEN** the number of categories exceeds the available horizontal space
- **THEN** the category row remains usable without overlapping content and allows access to all category links

### Requirement: Category links SHALL navigate to matching category listings
The system SHALL route users to the corresponding category listing page when a category link is selected from the home page category row.

#### Scenario: Selecting a category opens its listing
- **WHEN** the user selects a category link from the home page row
- **THEN** the system navigates to the listing page filtered to that selected category

### Requirement: Category link labels SHALL support localization and accessibility
The system SHALL present category link labels and interactions in a way that supports localization and accessible navigation.

#### Scenario: Localized labels are rendered
- **WHEN** the app locale is set to a supported language
- **THEN** category link labels are rendered using localized display values available for that locale

#### Scenario: Links are keyboard and screen-reader accessible
- **WHEN** a user navigates the home page with keyboard or assistive technology
- **THEN** each category link is focusable, announced as an interactive link, and can be activated to navigate
