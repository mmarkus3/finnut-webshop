import { getProductIdentifier } from '@/components/product/cardUtils';
import { CartItem } from '@/types/cart';
import { Order, OrderCustomer } from '@/types/order';
import { OrdersService } from '@/services/order';

const buildCheckoutOrderPayload = (items: CartItem[], customer?: OrderCustomer, discount?: string): Order => {
  const normalizedDiscount = discount?.trim();
  return {
    status: 'draft',
    products: items.map((item) => ({
      id: getProductIdentifier(item.product),
      name: item.product.name,
      amount: item.quantity,
    })),
    ...(customer ? { customer } : {}),
    ...(normalizedDiscount ? { discount: normalizedDiscount } : {}),
  };
};

const buildOrdersService = (): OrdersService => {
  return new OrdersService(process.env.EXPO_PUBLIC_FIREBASE_API!, `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}`);
};

const createOrderForCheckout = async (
  items: CartItem[],
  customer?: OrderCustomer,
  discount?: string,
  service: Pick<OrdersService, 'save'> = buildOrdersService()
): Promise<Order> => {
  const payload = buildCheckoutOrderPayload(items, customer, discount);
  return service.save(payload);
};

const shouldFallbackToCreate = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const maybeError = error as { response?: { status?: number } };
  const status = maybeError.response?.status;
  return status === 400 || status === 404;
};

const syncOrderForCheckout = async (
  items: CartItem[],
  activeOrderId: string | null,
  customer?: OrderCustomer,
  discount?: string,
  service: Pick<OrdersService, 'save'> = buildOrdersService()
): Promise<Order> => {
  const payload = buildCheckoutOrderPayload(items, customer, discount);

  if (!activeOrderId) {
    return service.save(payload);
  }

  try {
    return await service.save({ ...payload, id: activeOrderId });
  } catch (error) {
    if (!shouldFallbackToCreate(error)) {
      throw error;
    }

    return service.save(payload);
  }
};

export {
  buildCheckoutOrderPayload,
  buildOrdersService,
  createOrderForCheckout,
  shouldFallbackToCreate,
  syncOrderForCheckout,
};
