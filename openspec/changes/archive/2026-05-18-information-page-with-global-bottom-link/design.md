## Context

The app already uses a shared root layout with a global header and a global delivery-pricing banner under the header. There is no globally available bottom navigation area for auxiliary pages. The request is to add an information page and expose it via a bottom link area visible across pages with the same background color as header.

## Goals / Non-Goals

**Goals:**
- Introduce an information page route for static informational content.
- Add a global bottom link area in shared layout so all pages show the link.
- Match bottom area background color to header background for visual consistency.
- Ensure new bottom area does not conflict with existing global top delivery banner.
- Add localization coverage and test coverage for visibility/navigation behavior.

**Non-Goals:**
- Building a full CMS or dynamic content management for information content.
- Redesigning header interactions, search/cart flows, or existing page content.
- Adding multiple footer links in this change.

## Decisions

- Implement bottom link area in root layout (`app/_layout.tsx`) rather than per-page.
Rationale: Guarantees consistency and avoids duplicated page-specific implementations.

- Add a dedicated route/page component for information content.
Rationale: Keeps informational content modular and enables future expansion.

- Reuse theme/background token already used by header for the bottom area.
Rationale: Meets visual requirement while preserving existing design system choices.

- Keep link copy and page text in i18n translation files.
Rationale: Prevents hard-coded strings and aligns with existing localization practices.

- Validate with lightweight component/navigation tests.
Rationale: Ensures link is present globally and route navigation works.

## Risks / Trade-offs

- [Risk] Global bottom area may reduce content viewport on small screens. -> Mitigation: keep area compact and validate spacing on mobile.
- [Risk] Potential overlap with safe-area/scroll behavior depending on page container styles. -> Mitigation: place bottom link area in layout outside content scroll regions and test main screens.
- [Trade-off] Single-link bottom area is intentionally minimal for now. -> Mitigation: can be extended in follow-up if more links are needed.
