## Context

The footer currently appends an information-page link in normal page flow. There are no social-media links in the footer area. The request adds Instagram and Facebook links, centered, on a dedicated row.

## Goals / Non-Goals

**Goals:**
- Add Instagram and Facebook links to footer.
- Render social links on a separate centered row.
- Preserve existing information-link behavior and footer placement in page flow.
- Maintain accessibility labels and tap targets.

**Non-Goals:**
- Adding additional social networks beyond Instagram and Facebook.
- Changing information page route/content.
- Redesigning full footer color system.

## Decisions

- Extend existing `GlobalBottomInfoLink` component to include a second row for social links.
Rationale: keeps footer behavior centralized and avoids duplicate implementations.

- Use two pressable links centered in a row beneath the information link.
Rationale: satisfies own-row and centered-placement requirement explicitly.

- Open social URLs with existing navigation/linking mechanism used in app conventions.
Rationale: predictable external-link behavior.

- Add translation keys for social labels and accessibility labels.
Rationale: avoids hard-coded UI copy and preserves localization approach.

## Risks / Trade-offs

- [Risk] External URL opening behavior can vary between platforms. -> Mitigation: use React Native linking approach and cover invocation in tests.
- [Trade-off] Footer becomes taller with extra row. -> Mitigation: keep compact spacing and centered layout.
