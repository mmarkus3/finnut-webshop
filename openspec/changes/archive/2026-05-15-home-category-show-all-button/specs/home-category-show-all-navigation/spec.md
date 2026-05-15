## ADDED Requirements

### Requirement: Home Category Section SHALL Provide Show-All Action
The system SHALL provide a "Show all" action for each category section on the home page.

#### Scenario: Show-all action is visible per category section
- **WHEN** a category section with products is rendered on home page
- **THEN** a "Show all" action is displayed in that section header

### Requirement: Show-All Action SHALL Navigate To Full Category Listing
The system SHALL navigate users to the category listing page for the selected section when "Show all" is activated.

#### Scenario: Navigate to selected category page
- **WHEN** user activates "Show all" for a category section
- **THEN** system navigates to `/category/[categoryId]` with that section's category id

### Requirement: Show-All Labels MUST Be Localized
The system MUST localize the show-all action text and accessibility label.

#### Scenario: Render localized show-all action
- **WHEN** active locale changes
- **THEN** the show-all action text and accessibility label render in the selected locale
