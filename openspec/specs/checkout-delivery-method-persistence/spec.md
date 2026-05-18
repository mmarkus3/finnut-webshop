# checkout-delivery-method-persistence Specification

## Purpose
TBD - created by archiving change persist-selected-delivery-method-to-order. Update Purpose after archive.
## Requirements
### Requirement: Selected delivery method id SHALL be saved to backend order
The system SHALL update the active order with the selected delivery method id when user selects a delivery option.

#### Scenario: Delivery method selection updates order
- **WHEN** user selects a delivery method in checkout
- **THEN** system updates active backend order with `deliveryMethod=<selectedMethodId>`

### Requirement: Delivery-method update failure SHALL be recoverable
The system SHALL keep checkout usable and provide retry-capable feedback when delivery-method persistence fails.

#### Scenario: Delivery-method update fails
- **WHEN** backend order update request fails
- **THEN** user sees error feedback and can retry selecting/saving delivery method

