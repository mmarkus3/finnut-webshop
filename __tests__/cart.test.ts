import {
  canAddProductToCart,
  cartReducer,
  getCartBadgeCountLabel,
  getCartItemCount,
  getCartTotalPrice,
  initialCartState,
  normalizeCartProductId,
} from '@/hooks/cart';
import { Product } from '@/types/product';

describe('cart state helpers and reducer', () => {
  const apple: Product = { id: 'p1', name: 'Apple', amount: 2, ean: '111', images: [], retailPrice: 1.5 };
  const milk: Product = { id: 'p2', name: 'Milk', amount: 5, ean: '222', images: [], unitPrice: 2 };

  it('adds items and clamps quantity to stock', () => {
    const s1 = cartReducer(initialCartState, { type: 'ADD_ITEM', payload: { product: apple } });
    const s2 = cartReducer(s1, { type: 'ADD_ITEM', payload: { product: apple } });
    const s3 = cartReducer(s2, { type: 'ADD_ITEM', payload: { product: apple } });

    expect(s3.items.p1.quantity).toBe(2);
  });

  it('increments, decrements and removes items', () => {
    const s1 = cartReducer(initialCartState, { type: 'ADD_ITEM', payload: { product: milk } });
    const s2 = cartReducer(s1, { type: 'INCREMENT', payload: { productId: 'p2' } });
    const s3 = cartReducer(s2, { type: 'DECREMENT', payload: { productId: 'p2' } });
    const s4 = cartReducer(s3, { type: 'REMOVE_ITEM', payload: { productId: 'p2' } });

    expect(s2.items.p2.quantity).toBe(2);
    expect(s3.items.p2.quantity).toBe(1);
    expect(s4.items.p2).toBeUndefined();
  });

  it('derives count, totals and badge labels', () => {
    const s1 = cartReducer(initialCartState, { type: 'ADD_ITEM', payload: { product: apple } });
    const s2 = cartReducer(s1, { type: 'ADD_ITEM', payload: { product: milk } });

    expect(getCartItemCount(s2)).toBe(2);
    expect(getCartTotalPrice(s2)).toBe(3.5);
    expect(getCartBadgeCountLabel(2)).toBe('2');
    expect(getCartBadgeCountLabel(120)).toBe('99+');
  });

  it('checks if product can be added with stock limit', () => {
    const s1 = cartReducer(initialCartState, { type: 'ADD_ITEM', payload: { product: apple } });
    const s2 = cartReducer(s1, { type: 'ADD_ITEM', payload: { product: apple } });

    expect(canAddProductToCart(s2, apple)).toBe(false);
    expect(canAddProductToCart(s2, milk)).toBe(true);
  });

  it('normalizes runtime product ids so remove works with non-string ids', () => {
    const numericIdProduct = {
      id: 101 as unknown as string,
      name: 'Numeric',
      amount: 3,
      ean: 'ean-101',
      images: [],
      retailPrice: 1,
    } as Product;

    const s1 = cartReducer(initialCartState, { type: 'ADD_ITEM', payload: { product: numericIdProduct } });
    const normalized = normalizeCartProductId('101');
    expect(s1.items[normalized]).toBeDefined();

    const s2 = cartReducer(s1, { type: 'REMOVE_ITEM', payload: { productId: normalized } });
    expect(s2.items[normalized]).toBeUndefined();
  });
});
