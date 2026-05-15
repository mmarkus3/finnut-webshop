import { getProductIdentifier } from '@/components/product/cardUtils';
import { CartItem } from '@/types/cart';
import { Order } from '@/types/order';
import { OrdersService } from '@/services/order';

const buildCheckoutOrderPayload = (items: CartItem[]): Order => {
  return {
    status: 'draft',
    products: items.map((item) => ({
      id: getProductIdentifier(item.product),
      name: item.product.name,
      amount: item.quantity,
    })),
  };
};

const buildOrdersService = (): OrdersService => {
  return new OrdersService(process.env.EXPO_PUBLIC_FIREBASE_API!, `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}`);
};

const createOrderForCheckout = async (
  items: CartItem[],
  service: Pick<OrdersService, 'save'> = buildOrdersService()
): Promise<Order> => {
  const payload = buildCheckoutOrderPayload(items);
  return service.save(payload);
};

export { buildCheckoutOrderPayload, buildOrdersService, createOrderForCheckout };
