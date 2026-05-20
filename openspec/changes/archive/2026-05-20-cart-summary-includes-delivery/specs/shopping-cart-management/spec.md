## ADDED Requirements

### Requirement: Cart Summary Total Includes Delivery Cost
The cart summary final total SHALL equal item subtotal plus delivery cost when delivery cost is available.

#### Scenario: Delivery cost is available and not free
- **WHEN** cart subtotal is known and delivery cost is a finite non-zero value
- **THEN** summary total is calculated as `subtotal + delivery cost`

#### Scenario: Delivery is free
- **WHEN** delivery state is free and delivery cost is zero
- **THEN** summary total equals subtotal

#### Scenario: Delivery cost is unknown
- **WHEN** delivery cost is not yet available and placeholder is shown
- **THEN** summary total remains based on subtotal only
- **AND** delivery row continues showing placeholder text
