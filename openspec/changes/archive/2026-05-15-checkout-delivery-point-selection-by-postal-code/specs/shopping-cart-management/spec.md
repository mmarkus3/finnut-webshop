## ADDED Requirements

### Requirement: Checkout continuation SHALL retain selected delivery point
The system SHALL keep selected delivery point in checkout state for subsequent order continuation.

#### Scenario: Selected point is retained in checkout session
- **WHEN** user selects a delivery point from results list
- **THEN** selected point remains associated with current checkout session until changed
