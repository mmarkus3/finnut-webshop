## Why

Users currently need to scroll or navigate deeper before they can browse product categories. Adding category links at the top of the home page improves discoverability and shortens the path to category browsing.

## What Changes

- Add a horizontal row of category links at the top section of the home page.
- Populate the row from available webshop categories so labels and targets stay consistent with catalog data.
- Ensure each link navigates users directly to the corresponding category listing page.
- Add responsive and accessibility-friendly behavior so the row remains usable on smaller screens and with keyboard navigation.

## Capabilities

### New Capabilities
- `homepage-category-navigation`: Shows category links on the home page and routes users to matching category pages.

### Modified Capabilities
- None.

## Impact

- Affected UI: home page top content area and shared link styling.
- Affected behavior: home page navigation flow to category listing pages.
- Dependencies: existing category data source and current routing/navigation setup.
- Testing: add/adjust tests for rendering, navigation target correctness, and accessibility behavior.
