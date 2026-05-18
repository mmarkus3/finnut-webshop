## Why

Checkout currently captures customer identity and address but not a phone number. A phone number is needed for delivery coordination and customer contact, so we should capture and persist it as part of customer information.

## What Changes

- Add a phone number input to the checkout customer information form.
- Include phone number in the order/customer payload that is saved from checkout.
- Add localized labels/placeholders and validation feedback text for the phone number field.
- Add tests to verify phone number rendering, editing, and persistence behavior.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `checkout-customer-information-page`: Extend checkout customer information requirements to include saving customer phone number.

## Impact

- Affected UI: checkout customer information form component and translations.
- Affected data flow: order/customer payload mapping sent to backend.
- Affected tests: checkout page unit tests for customer form and save behavior.
