import { OrdersService } from '@/services/order';

const buildOrdersService = (): OrdersService => {
  return new OrdersService(process.env.EXPO_PUBLIC_FIREBASE_API!, `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}`);
};

const saveDeliveryMethodToOrder = async (
  orderId: string,
  deliveryMethodId: string,
  service: Pick<OrdersService, 'patch'> = buildOrdersService()
): Promise<void> => {
  await service.patch(orderId, { deliveryMethod: deliveryMethodId });
};

export { buildOrdersService, saveDeliveryMethodToOrder };
