import { CheckoutPage } from '@/components/checkout/CheckoutPage';
import { AppPageWithInfoLink } from '@/components/layout/AppPageWithInfoLink';

export default function CheckoutScreen() {
  return (
    <AppPageWithInfoLink>
      <CheckoutPage />
    </AppPageWithInfoLink>
  );
}
