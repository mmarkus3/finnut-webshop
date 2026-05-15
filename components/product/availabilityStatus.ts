export type AvailabilityStatusKey = 'outOfStock' | 'lowStock' | 'inStock';

interface AvailabilityStatusMeta {
  key: AvailabilityStatusKey;
  labelKey: string;
  textClassName: string;
  bgClassName: string;
}

const getAvailabilityStatusKey = (amount: number): AvailabilityStatusKey => {
  if (amount <= 0) {
    return 'outOfStock';
  }

  if (amount < 10) {
    return 'lowStock';
  }

  return 'inStock';
};

const getAvailabilityStatusMeta = (amount: number): AvailabilityStatusMeta => {
  const statusKey = getAvailabilityStatusKey(amount);

  if (statusKey === 'outOfStock') {
    return {
      key: statusKey,
      labelKey: 'availability.outOfStock',
      textClassName: 'text-red-700',
      bgClassName: 'bg-red-100',
    };
  }

  if (statusKey === 'lowStock') {
    return {
      key: statusKey,
      labelKey: 'availability.lowStock',
      textClassName: 'text-yellow-700',
      bgClassName: 'bg-yellow-100',
    };
  }

  return {
    key: statusKey,
    labelKey: 'availability.inStock',
    textClassName: 'text-green-700',
    bgClassName: 'bg-green-100',
  };
};

export { getAvailabilityStatusKey, getAvailabilityStatusMeta };
