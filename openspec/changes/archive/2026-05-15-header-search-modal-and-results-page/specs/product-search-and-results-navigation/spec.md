## ADDED Requirements

### Requirement: Header Search Modal Entry
The system SHALL provide a search action in the header that opens a small modal containing a search input field.

#### Scenario: Open search modal from header
- **WHEN** the user activates the header search button
- **THEN** the system opens a small search modal with a focused search input

### Requirement: Modal Search Result Preview
The system SHALL show matching product results inside the search modal while the user enters a query.

#### Scenario: Show matching products in modal
- **WHEN** the user types a non-empty search query in the modal input
- **THEN** the system displays matching products in the modal result area

#### Scenario: Show empty state for no modal matches
- **WHEN** the user types a non-empty search query and no products match
- **THEN** the system displays a localized no-results message in the modal

### Requirement: Navigate from Modal to Full Search Results
The system SHALL provide a way to open a dedicated search results page from the modal using the active query.

#### Scenario: Submit query to full results page
- **WHEN** the user submits the modal search query
- **THEN** the system navigates to the search results page with that query applied

#### Scenario: Open full results from preview interaction
- **WHEN** the user selects a modal action to view all results for the current query
- **THEN** the system navigates to the dedicated search results page with the same query

### Requirement: Dedicated Search Results Page
The system SHALL provide a dedicated page that renders the full list of matching products for a given search query.

#### Scenario: Load results page with query
- **WHEN** the user arrives on the search results page with a query
- **THEN** the page displays products that match that query

#### Scenario: Show empty state on results page
- **WHEN** the search results page has no matches for the active query
- **THEN** the page displays a localized no-results state

### Requirement: Search UI Localization
The system MUST localize all newly introduced search text via i18next resources.

#### Scenario: Render localized search text
- **WHEN** the active locale changes
- **THEN** search modal and search results page labels, placeholders, and empty states render in the selected locale
