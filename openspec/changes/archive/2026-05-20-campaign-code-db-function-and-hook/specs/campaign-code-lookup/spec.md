## ADDED Requirements

### Requirement: Campaign Lookup Service By Code
The system SHALL provide a reusable service function that fetches campaign data by company and campaign code from endpoint `apiUrl/campaigns/company/:company/campaign/:code`.

#### Scenario: Successful campaign lookup
- **WHEN** a valid company identifier and campaign code are provided
- **THEN** the service sends a GET request to `apiUrl/campaigns/company/:company/campaign/:code`
- **AND** the service returns parsed campaign payload data

#### Scenario: Empty campaign code input
- **WHEN** campaign code input is empty or whitespace only
- **THEN** the service/hook flow does not issue a network request
- **AND** caller receives deterministic empty-input handling state

### Requirement: Campaign Lookup Hook State Contract
The system SHALL provide a hook for campaign-by-code lookup that exposes request trigger, loading state, result data, and error state.

#### Scenario: Hook request success state
- **WHEN** consumer triggers campaign lookup with a valid code and request succeeds
- **THEN** hook sets loading true during request
- **AND** hook stores returned campaign data
- **AND** hook clears previous error state

#### Scenario: Hook request failure state
- **WHEN** consumer triggers campaign lookup and request fails
- **THEN** hook sets loading false after request
- **AND** hook stores error state for UI handling
- **AND** hook does not keep stale success data as active result
