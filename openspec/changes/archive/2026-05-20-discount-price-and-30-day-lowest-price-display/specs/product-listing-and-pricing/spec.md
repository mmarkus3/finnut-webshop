## ADDED Requirements

### Requirement: Discount Price Presentation In Product Listings
When a product has a `discountPrice`, the product listing UI SHALL display the discounted price as the primary price in red, and SHALL display the regular `retailPrice` as overlined.

#### Scenario: Product has discount price and retail price
- **WHEN** a product card is rendered and product data includes both `discountPrice` and `retailPrice`
- **THEN** the product card shows `discountPrice` as the primary price styled in red
- **AND** the product card shows `retailPrice` with overline styling

#### Scenario: Product has no discount price
- **WHEN** a product card is rendered and product data does not include `discountPrice`
- **THEN** the product card shows regular price using existing non-discount styling

### Requirement: 30-Day Lowest Price Disclosure In Product Listings
When a product has a `discountPrice`, the product listing UI SHALL show `lowestRetailPriceLast30Days` with label `Alin hinta edellisen 30 päivän aikana`.

#### Scenario: Product has discount and lowest 30-day price
- **WHEN** a product card is rendered and product data includes `discountPrice` and `lowestRetailPriceLast30Days`
- **THEN** the product card shows label `Alin hinta edellisen 30 päivän aikana`
- **AND** the product card shows the formatted `lowestRetailPriceLast30Days` value

#### Scenario: Product has discount but missing lowest 30-day price
- **WHEN** a product card is rendered and product data includes `discountPrice` but not `lowestRetailPriceLast30Days`
- **THEN** the product card still shows discount and overlined retail price
- **AND** the 30-day lowest price line is not rendered
