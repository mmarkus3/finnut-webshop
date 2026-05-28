import { getItemName, getProductIdentifier } from '@/components/product/cardUtils';
import { OrdersService } from '@/services/order';
import { CartItem } from '@/types/cart';
import { Order, OrderCustomer } from '@/types/order';
import { resolveWebshopCountry } from './countryConfig';

const buildCheckoutOrderPayload = (items: CartItem[], customer?: OrderCustomer, discount?: string, language?: string): Order => {
  const normalizedDiscount = discount?.trim();
  const country = resolveWebshopCountry();

  return {
    status: 'draft',
    products: items.map((item) => ({
      id: getProductIdentifier(item.product),
      name: getItemName(item.product, language) ?? '',
      amount: item.quantity,
    })),
    ...(customer ? { customer } : {}),
    ...(normalizedDiscount ? { discount: normalizedDiscount } : {}),
    country,
  };
};

const buildOrdersService = (): OrdersService => {
  return new OrdersService(process.env.EXPO_PUBLIC_FIREBASE_API!, `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}`);
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
  language?: string,
  service: Pick<OrdersService, 'save'> = buildOrdersService()
): Promise<Order> => {
  const payload = buildCheckoutOrderPayload(items, customer, discount, language);

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
  shouldFallbackToCreate,
  syncOrderForCheckout
};

