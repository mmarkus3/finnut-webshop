## Why

On the home page, users can browse a horizontal preview of products per category, but there is no direct “show all” action for that category section. Adding a clear “Show all” button improves discoverability and reduces steps to reach full category listings.

## What Changes

- Add a “Show all” button in each home category product section.
- Make the button navigate to that category’s full listing page.
- Ensure button text and accessibility labels are localized via i18next.
- Keep existing carousel behavior intact while adding the new category-level action.

## Capabilities

### New Capabilities
- `home-category-show-all-navigation`: Home category sections provide direct “Show all” navigation to full category product listing.

### Modified Capabilities
- `homepage-category-product-sections`: Home category section UI and behavior include a category-level “Show all” action.

## Impact

- Affected areas: home category section component, route navigation wiring, and translation resources.
- Data/API impact: none; uses existing category ids and existing category route.
- Dependencies: current category page route (`/category/[categoryId]`) and Jest tests for home category section interactions.
