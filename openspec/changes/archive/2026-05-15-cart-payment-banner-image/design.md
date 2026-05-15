## Context

Cart page currently ends with summary and checkout CTA. No payment provider image is displayed yet. Requested behavior is a remote image placed at the bottom of cart page.

## Goals / Non-Goals

**Goals:**
- Show Visma Pay row banner below cart summary content.
- Keep banner placement consistent across viewport sizes.
- Keep existing cart interactions intact.

**Non-Goals:**
- No payment integration logic changes.
- No dynamic provider switching.

## Decisions

- Use React Native `Image` with remote URI source for the exact provided URL.
- Render banner in dedicated bottom container after summary block.
- Add accessibility label for image semantics.
- Keep a conservative fixed height with `contain`/`cover` style to avoid layout breakage.

## Risks / Trade-offs

- [Risk] Remote image may fail to load due to network issues. -> Mitigation: keep layout resilient; optionally add fallback in later iteration.
- [Trade-off] External asset dependency reduces full offline fidelity.
