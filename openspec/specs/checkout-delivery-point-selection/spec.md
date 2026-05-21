# checkout-delivery-point-selection Specification

## Purpose
TBD - created by archiving change checkout-delivery-point-selection-by-postal-code. Update Purpose after archive.
## Requirements
### Requirement: Checkout SHALL fetch delivery points by postal code
The system SHALL fetch delivery points from company-scoped orders points endpoint using entered postal code.

#### Scenario: Delivery points request is sent
- **WHEN** user has entered postal code and requests delivery points
- **THEN** system performs GET request to `/orders/company/${process.env.EXPO_PUBLIC_COMPANY}/points?postalCode=<postalCode>` using `process.env.EXPO_PUBLIC_FIREBASE_API` base URL

### Requirement: Checkout SHALL show top 10 delivery points for selection
The system SHALL display at most 10 delivery points and allow user to choose one option.

#### Scenario: Delivery points list is shown and selectable
- **WHEN** endpoint returns delivery points
- **THEN** checkout displays the first 10 points in a selectable list and allows exactly one selected point at a time

### Requirement: Checkout SHALL handle delivery-point fetch states
The system SHALL present loading, empty, and error states for delivery-point retrieval.

#### Scenario: Fetch state feedback is visible
- **WHEN** fetch is pending, fails, or returns no points
- **THEN** corresponding state message is shown to user

### Requirement: Delivery-point selection SHALL trigger persistence to active order
The system SHALL persist selected delivery point id as order delivery method value.

#### Scenario: Point selection persists method id
- **WHEN** user selects one delivery point from list
- **THEN** selected point id is sent to backend as order `deliveryMethod` value

### Requirement: Delivery-point fetch implementation SHALL use shared HTTP helper
The system SHALL execute delivery-point API requests through a shared HTTP helper module rather than direct axios usage inside delivery-point hook.

#### Scenario: Delivery-point hook delegates request to shared helper
- **WHEN** checkout requests delivery points by postal code
- **THEN** delivery-point hook uses shared helper to perform GET request and preserves existing endpoint/params behavior
