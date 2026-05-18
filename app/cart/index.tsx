import { CartPage } from '@/components/cart/CartPage';
import { AppPageWithInfoLink } from '@/components/layout/AppPageWithInfoLink';

export default function CartScreen() {
  return (
    <AppPageWithInfoLink>
      <CartPage />
    </AppPageWithInfoLink>
  );
}
