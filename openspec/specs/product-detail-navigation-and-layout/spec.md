# product-detail-navigation-and-layout Specification

## Purpose
Define navigation and layout requirements for the dedicated product detail page.
## Requirements
### Requirement: Users SHALL be able to navigate to a product page
The system SHALL allow users to open a dedicated product page from product browse surfaces.

#### Scenario: Product card navigation opens product page
- **WHEN** a user selects a product card from home or category browse views
- **THEN** the system navigates to that product’s dedicated product page route

### Requirement: Product page SHALL resolve and render selected product details
The system SHALL load and display details for the selected product using the route-provided product identifier.

#### Scenario: Product details are shown for valid identifier
- **WHEN** a product page is opened with a valid product identifier
- **THEN** the page displays the corresponding product’s details

#### Scenario: Unknown product identifier is handled safely
- **WHEN** a product page is opened with an identifier that does not match any product
- **THEN** the page renders a safe fallback/not-found state without crashing

### Requirement: Product page SHALL provide responsive image/details layout
The system SHALL render a responsive product detail layout that differs between desktop and mobile.

#### Scenario: Desktop layout uses side-by-side split
- **WHEN** the product page is viewed on desktop viewport
- **THEN** a large product image is displayed on the left and product details are displayed on the right

#### Scenario: Mobile layout uses stacked arrangement
- **WHEN** the product page is viewed on mobile viewport
- **THEN** the product image is displayed on top and product details are displayed below it

### Requirement: Product detail price SHALL include localized currency
The system SHALL display product detail page price values with locale-specific currency markers.

#### Scenario: Product detail price includes locale currency
- **WHEN** a product detail page renders a price field
- **THEN** the price text includes `€` for Finnish locale and `SEK` for Swedish locale

### Requirement: Product detail page SHALL display localized unit price per kilogram
The system SHALL display unit price per kilogram on product detail page when product data allows calculation.

#### Scenario: Unit price per kg is visible for calculable product
- **WHEN** product detail page renders a product with valid retail price and weight basis
- **THEN** unit price per kilogram is shown with localized currency formatting

#### Scenario: Unit price per kg is hidden for non-calculable product
- **WHEN** required inputs for unit-price calculation are missing or invalid
- **THEN** unit price per kilogram line is not displayed and page remains stable

### Requirement: Product detail page SHALL allow selecting quantity before add-to-cart
The system SHALL provide quantity controls on product detail page so user can choose amount before adding product to cart.

#### Scenario: User selects quantity and adds in one action
- **WHEN** user selects quantity N on product detail and taps add-to-cart
- **THEN** cart receives N pieces for that product in one add action, respecting stock limits

### Requirement: Product Detail Shows All Product Images
The product detail page SHALL render all available product images for the selected product. The system MUST preserve image order from the product image list and MUST render a fallback image when no valid product images are available.

#### Scenario: Product has multiple images
- **WHEN** a selected product contains more than one valid image URL
- **THEN** the product detail page displays all of those images in the image section
- **AND** images appear in the same order as provided by the product data

#### Scenario: Product has one image
- **WHEN** a selected product contains exactly one valid image URL
- **THEN** the product detail page displays that image in the image section

#### Scenario: Product has no valid images
- **WHEN** a selected product has no valid image URLs
- **THEN** the product detail page displays the existing fallback image

### Requirement: Product Detail Supports Swiper Carousel For Images
The product detail page SHALL present product images in a swipeable carousel when one or more valid product image URLs are available. The system MUST preserve product image order and MUST show fallback content when no valid images exist.

#### Scenario: Multiple product images are available
- **WHEN** a selected product has two or more valid image URLs
- **THEN** the product detail page shows images in a swiper carousel
- **AND** the user can navigate between images by swiping
- **AND** images are shown in the same order as provided by product data

#### Scenario: Single product image is available
- **WHEN** a selected product has exactly one valid image URL
- **THEN** the product detail page shows that image in the carousel image area

#### Scenario: No valid product images are available
- **WHEN** a selected product has no valid image URLs
- **THEN** the product detail page shows the existing fallback image in the image area

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

