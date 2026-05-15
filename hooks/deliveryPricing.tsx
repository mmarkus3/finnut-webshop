import { create } from 'axios';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

interface DeliveryPricing {
  over: number;
  delivery: number;
}

interface DeliveryPricingContextValue {
  pricing: DeliveryPricing | null;
  isLoading: boolean;
  error: string | null;
}

const DeliveryPricingContext = createContext<DeliveryPricingContextValue | null>(null);

const fetchDeliveryPricing = async (): Promise<DeliveryPricing | null> => {
  const client = create({
    baseURL: process.env.EXPO_PUBLIC_FIREBASE_API!,
  });

  const response = await client.request<{ over?: number; delivery?: number }>({
    method: 'GET',
    url: `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/prices`,
  });

  const over = response.data?.over;
  const delivery = response.data?.delivery;

  if (!Number.isFinite(over) || !Number.isFinite(delivery)) {
    return null;
  }

  return { over: over!, delivery: delivery! };
};

const getDeliveryCost = (cartTotal: number, pricing: DeliveryPricing | null): { isFree: boolean; cost: number | null; over: number | null } => {
  if (!pricing) {
    return { isFree: false, cost: null, over: null };
  }

  if (cartTotal >= pricing.over) {
    return { isFree: true, cost: 0, over: pricing.over };
  }

  return { isFree: false, cost: pricing.delivery, over: pricing.over };
};

function DeliveryPricingProvider({ children }: PropsWithChildren) {
  const [pricing, setPricing] = useState<DeliveryPricing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const nextPricing = await fetchDeliveryPricing();
        if (active) {
          setPricing(nextPricing);
        }
      } catch {
        if (active) {
          setError('delivery-pricing-load-failed');
          setPricing(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ pricing, isLoading, error }), [pricing, isLoading, error]);

  return <DeliveryPricingContext.Provider value={value}>{children}</DeliveryPricingContext.Provider>;
}

const useDeliveryPricing = (): DeliveryPricingContextValue => {
  const context = useContext(DeliveryPricingContext);
  if (!context) {
    throw new Error('useDeliveryPricing must be used within DeliveryPricingProvider');
  }

  return context;
};

export { DeliveryPricingProvider, fetchDeliveryPricing, getDeliveryCost, useDeliveryPricing };
