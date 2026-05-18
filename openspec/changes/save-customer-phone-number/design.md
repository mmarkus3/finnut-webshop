## Context

Checkout currently captures customer name, email, and address fields, but does not capture a phone number. Delivery and fulfillment flows often require a phone number for contact or delivery-point notifications, so this customer field should be collected and persisted with the same checkout data flow used for other customer details.

## Goals / Non-Goals

**Goals:**
- Add a phone number field to checkout customer information.
- Persist the phone number in the order/customer payload when checkout information is saved or updated.
- Keep localization and accessibility behavior consistent with existing checkout fields.
- Cover field rendering and persistence behavior with tests.

**Non-Goals:**
- Adding advanced phone-number validation/format normalization per country.
- Changing checkout layout or delivery-point behavior.
- Introducing new backend endpoints or schema migrations.

## Decisions

- Reuse existing checkout customer state object and extend it with `phone`.
Rationale: Keeps form state model consistent and minimizes cross-module changes.

- Render phone input in customer information section with i18next label/placeholder keys.
Rationale: Maintains localization and accessibility parity with existing fields.

- Include phone in existing order update/create payload mapping.
Rationale: Keeps persistence in one pathway without additional service contracts.

- Add focused Jest tests for phone field visibility and payload inclusion.
Rationale: Verifies user-facing behavior and integration contract with minimal test overhead.

## Risks / Trade-offs

- [Risk] Backend may ignore or reject unknown `phone` fields if contract differs. -> Mitigation: Match current customer payload conventions and verify request shape in tests.
- [Trade-off] Minimal validation allows malformed numbers. -> Mitigation: Defer stricter validation to a dedicated follow-up change.
