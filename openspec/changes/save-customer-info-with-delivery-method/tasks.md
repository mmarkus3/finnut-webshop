## 1. Delivery Persistence

- [x] 1.1 Update `saveDeliveryMethodToOrder` to accept `OrderCustomer`.
- [x] 1.2 Patch active order with both `deliveryMethod` and `customer` in one request.
- [x] 1.3 Update delivery method persistence tests to assert the combined payload.

## 2. Checkout Integration

- [x] 2.1 Pass current checkout `customer` state into delivery method persistence when a delivery point is selected.
- [x] 2.2 Preserve existing delivery method saving, error, and selected-state behavior.
- [x] 2.3 Update checkout tests to assert customer data is passed when selecting a delivery point.

## 3. Verification

- [x] 3.1 Run relevant Jest tests for checkout and delivery method persistence.
