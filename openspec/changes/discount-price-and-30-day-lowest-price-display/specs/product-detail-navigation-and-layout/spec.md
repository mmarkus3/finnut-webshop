## ADDED Requirements

### Requirement: Discount Price Presentation In Product Detail
When a product has a `discountPrice`, the product detail price area SHALL display the discounted price as the primary price in red, and SHALL display the regular `retailPrice` as overlined.

#### Scenario: Product detail has discount and retail price
- **WHEN** product detail is shown for a product containing both `discountPrice` and `retailPrice`
- **THEN** detail view shows `discountPrice` as the main price styled in red
- **AND** detail view shows `retailPrice` with overline styling

#### Scenario: Product detail has no discount price
- **WHEN** product detail is shown for a product without `discountPrice`
- **THEN** detail view uses existing non-discount price presentation

### Requirement: 30-Day Lowest Price Disclosure In Product Detail
When a product has a `discountPrice`, the product detail page SHALL show `lowestRetailPriceLast30Days` with label `Alin hinta edellisen 30 päivän aikana`.

#### Scenario: Product detail has discount and lowest 30-day price
- **WHEN** product detail is shown for a product containing `discountPrice` and `lowestRetailPriceLast30Days`
- **THEN** detail view shows label `Alin hinta edellisen 30 päivän aikana`
- **AND** detail view shows the formatted `lowestRetailPriceLast30Days` value

#### Scenario: Product detail has discount but missing lowest 30-day price
- **WHEN** product detail is shown for a product containing `discountPrice` without `lowestRetailPriceLast30Days`
- **THEN** detail view still shows discount and overlined retail price
- **AND** the 30-day lowest price line is not rendered
