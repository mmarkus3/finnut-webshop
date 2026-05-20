import { useCampaignLookup } from '@/hooks/campaignLookup';
import { CampaignProductDiscount } from '@/types/campaign';
import { useCallback, useEffect, useMemo, useState } from 'react';

const CHECKOUT_DISCOUNT_CODE_STORAGE_KEY = 'finnut.checkoutDiscountCode.v1';

interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem?: (key: string) => void;
}

const getStorage = (): StorageLike | null => {
  if (typeof globalThis === 'undefined') {
    return null;
  }

  const candidate = (globalThis as { localStorage?: StorageLike }).localStorage;
  if (!candidate || typeof candidate.getItem !== 'function' || typeof candidate.setItem !== 'function') {
    return null;
  }

  return candidate;
};

const persistDiscountCode = (code: string): void => {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(CHECKOUT_DISCOUNT_CODE_STORAGE_KEY, code.trim());
};

const getPersistedDiscountCode = (): string | null => {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  const value = storage.getItem(CHECKOUT_DISCOUNT_CODE_STORAGE_KEY);
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null;
};

const clearPersistedDiscountCode = (): void => {
  const storage = getStorage();
  if (!storage || typeof storage.removeItem !== 'function') {
    return;
  }

  storage.removeItem(CHECKOUT_DISCOUNT_CODE_STORAGE_KEY);
};

const mapCampaignDiscountPercentagesByProduct = (
  campaign: { products?: CampaignProductDiscount[] } | null
): Record<string, { discountPercentage?: number; discountFixed?: number }> => {
  const byProductId: Record<string, { discountPercentage?: number; discountFixed?: number }> = {};
  const campaignProducts = Array.isArray(campaign?.products) ? campaign.products : [];

  campaignProducts.forEach((productDiscount: CampaignProductDiscount) => {
    const rawId = productDiscount.id;
    const id = typeof rawId === 'string' ? rawId.trim() : '';
    const discountPercentage = Number.isFinite(productDiscount.discountPercentage)
      ? Number(productDiscount.discountPercentage)
      : NaN;
    const discountFixed = Number.isFinite(productDiscount.discountFixed)
      ? Number(productDiscount.discountFixed)
      : NaN;

    if (!id) {
      return;
    }

    if (!Number.isFinite(discountPercentage) && !Number.isFinite(discountFixed)) {
      return;
    }

    byProductId[id] = {
      ...(Number.isFinite(discountPercentage) ? { discountPercentage } : {}),
      ...(Number.isFinite(discountFixed) ? { discountFixed } : {}),
    };
  });

  return byProductId;
};

const useCheckoutDiscount = () => {
  const { campaign, isLoading, error, fetchCampaignByCode, reset } = useCampaignLookup();
  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [activeDiscountCode, setActiveDiscountCode] = useState<string | null>(getPersistedDiscountCode());

  useEffect(() => {
    const stored = getPersistedDiscountCode();
    if (!stored) {
      return;
    }

    setDiscountCodeInput(stored);
    void fetchCampaignByCode(stored);
  }, [fetchCampaignByCode]);

  const applyDiscountCode = useCallback(async (): Promise<boolean> => {
    const normalized = discountCodeInput.trim();
    if (!normalized) {
      setActiveDiscountCode(null);
      clearPersistedDiscountCode();
      return false;
    }

    const result = await fetchCampaignByCode(normalized);
    if (!result) {
      setActiveDiscountCode(null);
      clearPersistedDiscountCode();
      return false;
    }

    setActiveDiscountCode(normalized);
    persistDiscountCode(normalized);
    return true;
  }, [discountCodeInput, fetchCampaignByCode]);

  const clearDiscountCode = useCallback(() => {
    setDiscountCodeInput('');
    setActiveDiscountCode(null);
    clearPersistedDiscountCode();
    reset();
  }, [reset]);

  const discountPercentagesByProduct = useMemo(() => {
    return mapCampaignDiscountPercentagesByProduct(campaign);
  }, [campaign]);

  return {
    discountCodeInput,
    setDiscountCodeInput,
    activeDiscountCode,
    applyDiscountCode,
    clearDiscountCode,
    campaign,
    discountPercentagesByProduct,
    isApplyingDiscount: isLoading,
    discountError: error,
  };
};

export {
  CHECKOUT_DISCOUNT_CODE_STORAGE_KEY,
  clearPersistedDiscountCode,
  getPersistedDiscountCode,
  mapCampaignDiscountPercentagesByProduct,
  persistDiscountCode,
  useCheckoutDiscount
};
