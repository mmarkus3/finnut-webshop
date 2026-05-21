# payment-success-return-page Specification

## Purpose
Define payment success return page behavior after provider redirect.

## Requirements
### Requirement: Payment success page SHALL render confirmation content
The system SHALL provide a `/payment/success` page that renders a payment success confirmation after provider redirect.

#### Scenario: Success page renders requested message
- **WHEN** user opens `/payment/success` with or without provider query parameters
- **THEN** the page displays title "Kiitos tilauksestanne"
- **AND** the page displays body "Tilauksenne on vastaanotettu ja käsitellään mahdollisimman pian"

#### Scenario: Provider query parameters do not block rendering
- **WHEN** user opens `/payment/success?AUTHCODE=5853FEDFA20B3991552336BA760CA79CAFB783A5380D1B287366527DA9881F08&RETURN_CODE=0&ORDER_NUMBER=aK1UtNP66eMrGax56G4C&SETTLED=1`
- **THEN** the success confirmation page renders normally

### Requirement: Payment success page SHALL provide home navigation
The system SHALL provide a button on the payment success page that navigates to the home page.

#### Scenario: User returns home from success page
- **WHEN** user presses the home navigation button
- **THEN** the system navigates to `/`
