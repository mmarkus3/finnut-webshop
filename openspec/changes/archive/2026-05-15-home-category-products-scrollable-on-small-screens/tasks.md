## 1. Small-Screen Scroll Behavior

- [x] 1.1 Audit current home category row `ScrollView` props and container sizing on small screens.
- [x] 1.2 Update row/container configuration to guarantee horizontal scrolling on small screens.
- [x] 1.3 Verify additional cards remain reachable via horizontal swipe/drag interaction.

## 2. Interaction Safety

- [x] 2.1 Ensure product card taps still work correctly inside scrollable rows.
- [x] 2.2 Ensure scrollability changes do not alter desktop behavior for home category rows.
- [x] 2.3 Keep current product card metadata rendering unchanged while adjusting scroll behavior.

## 3. Verification

- [x] 3.1 Extend tests for home category sections to assert horizontal scroll container behavior on small screens.
- [x] 3.2 Add/extend tests to verify product card navigation still works in scrollable rows.
- [x] 3.3 Add/extend tests to guard against regressions in section rendering with multiple products.
