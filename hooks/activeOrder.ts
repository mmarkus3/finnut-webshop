interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem?: (key: string) => void;
}

const ACTIVE_ORDER_ID_STORAGE_KEY = 'finnut.activeOrderId.v1';

const getOrderStorage = (): StorageLike | null => {
  if (typeof globalThis === 'undefined') {
    return null;
  }

  const candidate = (globalThis as { localStorage?: StorageLike }).localStorage;
  if (!candidate || typeof candidate.getItem !== 'function' || typeof candidate.setItem !== 'function') {
    return null;
  }

  return candidate;
};

const isValidActiveOrderId = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

const saveActiveOrderId = (orderId: string): void => {
  if (!isValidActiveOrderId(orderId)) {
    return;
  }

  const storage = getOrderStorage();
  if (!storage) {
    return;
  }

  storage.setItem(ACTIVE_ORDER_ID_STORAGE_KEY, orderId.trim());
};

const getActiveOrderId = (): string | null => {
  const storage = getOrderStorage();
  if (!storage) {
    return null;
  }

  const value = storage.getItem(ACTIVE_ORDER_ID_STORAGE_KEY);
  return isValidActiveOrderId(value) ? value.trim() : null;
};

const clearActiveOrderId = (): void => {
  const storage = getOrderStorage();
  if (!storage || typeof storage.removeItem !== 'function') {
    return;
  }

  storage.removeItem(ACTIVE_ORDER_ID_STORAGE_KEY);
};

export {
  ACTIVE_ORDER_ID_STORAGE_KEY,
  clearActiveOrderId,
  getActiveOrderId,
  isValidActiveOrderId,
  saveActiveOrderId,
};
