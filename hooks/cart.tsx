import { getProductIdentifier, getProductPrice } from '@/components/product/cardUtils';
import { CartItem, CartState } from '@/types/cart';
import { Product } from '@/types/product';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useReducer } from 'react';

const MAX_BADGE_COUNT = 99;

const initialCartState: CartState = {
  items: {},
};
const CART_STORAGE_KEY = 'finnut.cart.v1';

interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem?: (key: string) => void;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product } }
  | { type: 'INCREMENT'; payload: { productId: string } }
  | { type: 'DECREMENT'; payload: { productId: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR' };

const normalizeCartProductId = (productId: string): string => String(productId);

const clampQuantityToStock = (quantity: number, amount: number): number => {
  if (amount <= 0) {
    return 0;
  }

  return Math.min(quantity, amount);
};

const getCartItemCount = (state: CartState): number => {
  return Object.values(state.items).reduce((sum, item) => sum + item.quantity, 0);
};

const getCartBadgeCountLabel = (count: number): string => {
  return count > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : `${count}`;
};

const getCartTotalPrice = (state: CartState): number => {
  return Object.values(state.items).reduce((sum, item) => {
    const unitPrice = getProductPrice(item.product);
    if (unitPrice === null) {
      return sum;
    }

    return sum + unitPrice * item.quantity;
  }, 0);
};

const getCartVatAmount = (state: CartState): number => {
  return Object.values(state.items).reduce((sum, item) => {
    const unitPrice = getProductPrice(item.product);
    if (unitPrice === null) {
      return sum;
    }

    const taxRate = Number.isFinite(item.product.tax) ? item.product.tax : 0;
    return sum + (unitPrice * item.quantity * taxRate);
  }, 0);
};

const canAddProductToCart = (state: CartState, product: Product): boolean => {
  const productId = normalizeCartProductId(getProductIdentifier(product));
  const currentQuantity = state.items[productId]?.quantity ?? 0;
  return currentQuantity < product.amount;
};

const getCartStorage = (): StorageLike | null => {
  if (typeof globalThis === 'undefined') {
    return null;
  }

  const candidate = (globalThis as { localStorage?: StorageLike }).localStorage;
  if (!candidate || typeof candidate.getItem !== 'function' || typeof candidate.setItem !== 'function') {
    return null;
  }

  return candidate;
};

const isValidStoredCartItem = (item: unknown): item is CartItem => {
  if (!item || typeof item !== 'object') {
    return false;
  }

  const candidate = item as CartItem;
  return (
    typeof candidate.quantity === 'number'
    && Number.isFinite(candidate.quantity)
    && candidate.quantity > 0
    && !!candidate.product
    && typeof candidate.product === 'object'
    && typeof candidate.product.amount === 'number'
    && Number.isFinite(candidate.product.amount)
  );
};

const parseStoredCartState = (rawValue: string | null): CartState | null => {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as { items?: Record<string, unknown> };
    if (!parsed || typeof parsed !== 'object' || !parsed.items || typeof parsed.items !== 'object') {
      return null;
    }

    const items: Record<string, CartItem> = {};
    for (const [key, item] of Object.entries(parsed.items)) {
      if (isValidStoredCartItem(item)) {
        items[key] = item;
      }
    }

    return { items };
  } catch {
    return null;
  }
};

const loadPersistedCartState = (): CartState => {
  const storage = getCartStorage();
  if (!storage) {
    return initialCartState;
  }

  const parsed = parseStoredCartState(storage.getItem(CART_STORAGE_KEY));
  if (!parsed) {
    return initialCartState;
  }

  return parsed;
};

const persistCartState = (state: CartState): void => {
  const storage = getCartStorage();
  if (!storage) {
    return;
  }

  storage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload.product;
      const productId = normalizeCartProductId(getProductIdentifier(product));
      const existing = state.items[productId];
      const nextQuantity = clampQuantityToStock((existing?.quantity ?? 0) + 1, product.amount);

      if (nextQuantity <= 0) {
        return state;
      }

      return {
        ...state,
        items: {
          ...state.items,
          [productId]: {
            product,
            quantity: nextQuantity,
          },
        },
      };
    }

    case 'INCREMENT': {
      const productId = normalizeCartProductId(action.payload.productId);
      const existing = state.items[productId];
      if (!existing) {
        return state;
      }

      const nextQuantity = clampQuantityToStock(existing.quantity + 1, existing.product.amount);
      if (nextQuantity === existing.quantity) {
        return state;
      }

      return {
        ...state,
        items: {
          ...state.items,
          [productId]: {
            ...existing,
            quantity: nextQuantity,
          },
        },
      };
    }

    case 'DECREMENT': {
      const productId = normalizeCartProductId(action.payload.productId);
      const existing = state.items[productId];
      if (!existing) {
        return state;
      }

      const nextQuantity = existing.quantity - 1;
      if (nextQuantity <= 0) {
        const { [productId]: _removed, ...rest } = state.items;
        return { ...state, items: rest };
      }

      return {
        ...state,
        items: {
          ...state.items,
          [productId]: {
            ...existing,
            quantity: nextQuantity,
          },
        },
      };
    }

    case 'REMOVE_ITEM': {
      const productId = normalizeCartProductId(action.payload.productId);
      if (!state.items[productId]) {
        return state;
      }

      const { [productId]: _removed, ...rest } = state.items;
      return { ...state, items: rest };
    }

    case 'CLEAR':
      return initialCartState;

    default:
      return state;
  }
};

interface CartContextValue {
  state: CartState;
  items: CartItem[];
  itemCount: number;
  badgeCountLabel: string;
  totalPrice: number;
  vatAmount: number;
  addItem: (product: Product) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  canAddItem: (product: Product) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, () => loadPersistedCartState());

  useEffect(() => {
    persistCartState(state);
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = getCartItemCount(state);
    return {
      state,
      items: Object.values(state.items),
      itemCount,
      badgeCountLabel: getCartBadgeCountLabel(itemCount),
      totalPrice: getCartTotalPrice(state),
      vatAmount: getCartVatAmount(state),
      addItem: (product: Product) => dispatch({ type: 'ADD_ITEM', payload: { product } }),
      incrementItem: (productId: string) => dispatch({ type: 'INCREMENT', payload: { productId } }),
      decrementItem: (productId: string) => dispatch({ type: 'DECREMENT', payload: { productId } }),
      removeItem: (productId: string) => dispatch({ type: 'REMOVE_ITEM', payload: { productId } }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      canAddItem: (product: Product) => canAddProductToCart(state, product),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export {
  canAddProductToCart, CART_STORAGE_KEY, CartProvider, cartReducer, getCartBadgeCountLabel, getCartItemCount,
  getCartTotalPrice, getCartVatAmount, initialCartState, loadPersistedCartState, normalizeCartProductId,
  parseStoredCartState, persistCartState, useCart
};
