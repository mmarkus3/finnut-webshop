import {
  ACTIVE_ORDER_ID_STORAGE_KEY,
  clearActiveOrderId,
  getActiveOrderId,
  isValidActiveOrderId,
  saveActiveOrderId,
} from '@/hooks/activeOrder';

describe('active order local resume helpers', () => {
  const mockStorage = (() => {
    let values: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => (key in values ? values[key] : null)),
      setItem: jest.fn((key: string, value: string) => {
        values[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete values[key];
      }),
      clear: () => {
        values = {};
      },
    };
  })();

  beforeEach(() => {
    mockStorage.getItem.mockClear();
    mockStorage.setItem.mockClear();
    mockStorage.removeItem.mockClear();
    mockStorage.clear();
    Object.defineProperty(globalThis, 'localStorage', { value: mockStorage, configurable: true });
  });

  it('validates active order ids', () => {
    expect(isValidActiveOrderId('abc')).toBe(true);
    expect(isValidActiveOrderId('   ')).toBe(false);
    expect(isValidActiveOrderId(undefined)).toBe(false);
  });

  it('saves and loads active order id', () => {
    saveActiveOrderId('order-1');

    expect(mockStorage.setItem).toHaveBeenCalledWith(ACTIVE_ORDER_ID_STORAGE_KEY, 'order-1');
    expect(getActiveOrderId()).toBe('order-1');
  });

  it('returns null for missing or invalid stored ids', () => {
    expect(getActiveOrderId()).toBeNull();

    mockStorage.setItem(ACTIVE_ORDER_ID_STORAGE_KEY, '   ');
    expect(getActiveOrderId()).toBeNull();
  });

  it('clears active order id', () => {
    saveActiveOrderId('order-2');
    clearActiveOrderId();

    expect(mockStorage.removeItem).toHaveBeenCalledWith(ACTIVE_ORDER_ID_STORAGE_KEY);
    expect(getActiveOrderId()).toBeNull();
  });
});
