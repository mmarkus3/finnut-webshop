## Context

Product cards on home and category grid currently use fixed-height image containers that may crop images in a way that hides important product content. The request is to show the image completely in list/grid cards while preserving card usability and fallback image behavior.

## Goals / Non-Goals

**Goals:**
- Ensure complete product image visibility in home list and category grid cards.
- Preserve deterministic fallback behavior when images are missing.
- Maintain consistent card metadata rendering and responsive behavior.
- Add regression coverage for image-fit behavior.

**Non-Goals:**
- Introducing new image sources or backend transformations.
- Redesigning card layouts outside image presentation needs.
- Changing product routing or card interaction behavior.

## Decisions

1. Switch card image fit strategy from crop-oriented behavior to full-image containment.
- Rationale: ensures the entire image remains visible without content loss.

2. Keep image container dimensions stable and use neutral background padding area when aspect ratio differs.
- Rationale: preserves card layout rhythm while supporting varied image ratios.

3. Apply the same image-fit behavior to both home carousel cards and category grid cards.
- Rationale: consistent UX across list/grid surfaces.

4. Keep existing first-image selection and placeholder fallback logic unchanged.
- Rationale: avoid side effects in image source resolution.

## Risks / Trade-offs

- [Full-image contain can reduce perceived image size] -> Mitigation: tune container height and padding to keep cards visually balanced.
- [Inconsistent source image aspect ratios] -> Mitigation: rely on contain behavior with stable container background.
- [Visual regressions across breakpoints] -> Mitigation: verify in tests and ensure responsive classes are retained.
