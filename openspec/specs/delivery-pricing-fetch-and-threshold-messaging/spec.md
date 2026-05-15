# delivery-pricing-fetch-and-threshold-messaging Specification

## Purpose
TBD - created by archiving change delivery-pricing-threshold-banner-and-cost-display. Update Purpose after archive.
## Requirements
### Requirement: System SHALL fetch delivery pricing early in app session
The system SHALL request delivery pricing from company orders prices endpoint as early as possible.

#### Scenario: Pricing fetched at app startup phase
- **WHEN** app initializes main layout/session context
- **THEN** system performs GET `/orders/company/${process.env.EXPO_PUBLIC_COMPANY}/prices` and stores `over` and `delivery` values

### Requirement: System SHALL show global free-delivery threshold banner
The system SHALL display a banner under header across pages communicating free-delivery threshold.

#### Scenario: Threshold banner visible on pages
- **WHEN** delivery pricing is available
- **THEN** banner under header indicates deliveries over `over` amount are free

