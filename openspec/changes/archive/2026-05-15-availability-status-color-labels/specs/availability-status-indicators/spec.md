## ADDED Requirements

### Requirement: Availability Status SHALL Use Fixed Threshold Mapping
The system SHALL map product availability amount to a stock status with deterministic thresholds.

#### Scenario: Out of stock threshold
- **WHEN** product amount is `0`
- **THEN** system maps availability to out-of-stock status

#### Scenario: Low stock threshold
- **WHEN** product amount is greater than `0` and less than `10`
- **THEN** system maps availability to low-stock status

#### Scenario: In stock threshold
- **WHEN** product amount is `10` or greater
- **THEN** system maps availability to in-stock status

### Requirement: Availability Status SHALL Show Label And Color
The system SHALL render each availability status with both text label and semantic color.

#### Scenario: Out-of-stock presentation
- **WHEN** out-of-stock status is rendered
- **THEN** label text is `Loppu varastosta` and style is red

#### Scenario: Low-stock presentation
- **WHEN** low-stock status is rendered
- **THEN** label text is `Loppuu pian` and style is yellow

#### Scenario: In-stock presentation
- **WHEN** in-stock status is rendered
- **THEN** label text is `Varastossa` and style is green
