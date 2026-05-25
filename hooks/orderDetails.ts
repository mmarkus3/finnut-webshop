import { OrdersService } from '@/services/order';
import { Order } from '@/types/order';

const buildOrderDetailsService = (): OrdersService => {
  return new OrdersService(process.env.EXPO_PUBLIC_FIREBASE_API!, `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}`);
};

const fetchOrderDetails = async (
  orderId: string,
  service: Pick<OrdersService, 'get'> = buildOrderDetailsService()
): Promise<Order> => {
  return service.get(orderId);
};

export { buildOrderDetailsService, fetchOrderDetails };
