import { AppPageWithInfoLink } from '@/components/layout/AppPageWithInfoLink';
import { OrderDetailsPage } from '@/components/order/OrderDetailsPage';
import { useLocalSearchParams } from 'expo-router';

const normalizeOrderId = (value: string | string[] | undefined): string | null => {
  const orderId = Array.isArray(value) ? value[0] : value;
  return orderId?.trim() ? orderId.trim() : null;
};

export default function OrderScreen() {
  const { orderId } = useLocalSearchParams<{ orderId?: string | string[] }>();

  return (
    <AppPageWithInfoLink>
      <OrderDetailsPage orderId={normalizeOrderId(orderId)} />
    </AppPageWithInfoLink>
  );
}

export { normalizeOrderId };
