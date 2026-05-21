# payment-success-return-page Specification

## Purpose
Define payment success return page behavior after provider redirect, including handling of provider `RETURN_CODE` values.

## Requirements
### Requirement: Payment success page SHALL render confirmation content
The system SHALL provide a `/payment/success` page that renders payment return status content according to provider `RETURN_CODE`.

#### Scenario: Success page renders requested message
- **WHEN** user opens `/payment/success` with `RETURN_CODE=0`
- **THEN** the page displays title "Kiitos tilauksestanne"
- **AND** the page displays body "Tilauksenne on vastaanotettu ja käsitellään mahdollisimman pian"

#### Scenario: Failed payment return renders failure message
- **WHEN** user opens `/payment/success` with `RETURN_CODE=1`
- **THEN** the page displays payment failed text indicating the payment was not successfully completed

#### Scenario: Unresolved payment return renders status resolution message
- **WHEN** user opens `/payment/success` with `RETURN_CODE=4`
- **THEN** the page displays text indicating transaction status could not be updated and merchant resolution is needed

#### Scenario: Maintenance return renders maintenance message
- **WHEN** user opens `/payment/success` with `RETURN_CODE=10`
- **THEN** the page displays text indicating a maintenance break prevented transaction creation

#### Scenario: Missing or unknown return code renders unknown status message
- **WHEN** user opens `/payment/success` without `RETURN_CODE` or with an unrecognized `RETURN_CODE`
- **THEN** the page displays unknown payment status text

#### Scenario: Provider query parameters do not block rendering
- **WHEN** user opens `/payment/success?AUTHCODE=5853FEDFA20B3991552336BA760CA79CAFB783A5380D1B287366527DA9881F08&RETURN_CODE=0&ORDER_NUMBER=aK1UtNP66eMrGax56G4C&SETTLED=1`
- **THEN** the success confirmation page renders normally

### Requirement: Payment success page SHALL provide home navigation
The system SHALL provide a button on the payment success page that navigates to the home page.

#### Scenario: User returns home from success page
- **WHEN** user presses the home navigation button
- **THEN** the system navigates to `/`
