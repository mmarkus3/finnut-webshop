## Context

Home category product rows are currently rendered as horizontal carousels, but small-screen behavior can degrade if container sizing or gesture handling does not guarantee horizontal scroll interaction. The change targets home category sections only and should preserve existing desktop behavior while ensuring small-screen users can reliably browse products via scroll.

## Goals / Non-Goals

**Goals:**
- Guarantee horizontal scrolling for category product rows on small screens.
- Preserve existing product card layout/content and desktop interaction behavior.
- Ensure touch/gesture experience works cleanly across small-screen devices.
- Add test coverage for small-screen scroll behavior expectations.

**Non-Goals:**
- Redesigning card visuals or category data ordering.
- Changing category routing behavior.
- Altering product fetch or grouping logic.

## Decisions

1. Keep horizontal `ScrollView` for category rows and explicitly reinforce small-screen scrollability through sizing/props.
- Rationale: minimal change with clear UX outcome and no route/data side effects.

2. Scope changes to home category product sections only.
- Rationale: requirement is specific to home page behavior.

3. Add/extend tests around rendered scroll container configuration and interaction expectations.
- Rationale: prevents regressions for mobile browsing experience.

## Risks / Trade-offs

- [Nested gesture conflicts] -> Mitigation: keep row-level horizontal scroll interaction isolated from card press targets.
- [Small-screen clipping] -> Mitigation: verify card width/spacing still permits visible horizontal progression.
- [Platform differences in scroll feel] -> Mitigation: use standard RN scroll props and avoid platform-specific hacks.
