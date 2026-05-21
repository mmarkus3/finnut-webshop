import { AppPageWithInfoLink } from '@/components/layout/AppPageWithInfoLink';
import { PaymentSuccessPage } from '@/components/payment/PaymentSuccessPage';

export default function PaymentSuccessScreen() {
  return (
    <AppPageWithInfoLink>
      <PaymentSuccessPage />
    </AppPageWithInfoLink>
  );
}
