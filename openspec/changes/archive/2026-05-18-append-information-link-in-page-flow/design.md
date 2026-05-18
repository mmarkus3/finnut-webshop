## Context

The information link was introduced via a shared layout-level bottom area, which behaves like global footer content regardless of page content boundaries. The new requirement is to append the link to page content flow instead of fixed/global placement.

## Goals / Non-Goals

**Goals:**
- Ensure information link is rendered in normal page flow after content.
- Remove root-level global placement that behaves independently from page content.
- Keep link styling and navigation semantics intact.
- Keep implementation simple and testable.

**Non-Goals:**
- Redesigning information link appearance.
- Changing information page route or legal content.
- Introducing sticky/fixed footer behavior.

## Decisions

- Remove direct `GlobalBottomInfoLink` rendering from `app/_layout.tsx`.
Rationale: shared layout placement enforces global footer behavior that conflicts with requested appended flow.

- Render link via page-level composition (appended after each page's main content) using a reusable wrapper/composition approach.
Rationale: keeps behavior consistent while respecting normal layout flow.

- Reuse existing `GlobalBottomInfoLink` component for link behavior/styling.
Rationale: minimize code churn and preserve accessibility/navigation behavior.

## Risks / Trade-offs

- [Risk] Inconsistent adoption if a page omits appended link wrapper. -> Mitigation: use a common pattern/helper and update core pages together.
- [Trade-off] Slight per-page integration overhead compared to one global render. -> Mitigation: keep integration minimal and reusable.
