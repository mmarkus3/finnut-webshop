import { OrdersService } from '@/services/order';
import { Order } from '@/types/order';

interface PaymentMetadataPatch {
  paymentMethod: string;
  returnUrl: string;
}

const buildOrdersService = (): OrdersService => {
  return new OrdersService(process.env.EXPO_PUBLIC_FIREBASE_API!, `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}`);
};

const getRuntimeOrigin = (): string => {
  const location = (globalThis as { location?: { origin?: string } }).location;
  return location?.origin?.replace(/\/$/, '') ?? '';
};

const getPaymentSuccessReturnUrl = (origin = getRuntimeOrigin()): string => {
  const normalizedOrigin = origin.replace(/\/$/, '');
  return `${normalizedOrigin}/payment/success`;
};

const savePaymentMethodToOrder = async (
  orderId: string,
  paymentMethodId: string,
  service: Pick<OrdersService, 'patch'> = buildOrdersService()
): Promise<void> => {
  const payload: PaymentMetadataPatch = {
    paymentMethod: paymentMethodId,
    returnUrl: getPaymentSuccessReturnUrl(),
  };

  await service.patch(orderId, payload as unknown as Partial<Order>);
};

export { getPaymentSuccessReturnUrl, savePaymentMethodToOrder };
