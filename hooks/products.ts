import { ProductsService } from '@/services/product';
import { resolveWebshopCountry } from '@/hooks/countryConfig';
import { Product } from '@/types/product';
import { useEffect, useMemo, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => new ProductsService(process.env.EXPO_PUBLIC_FIREBASE_API!, `/products/company/${process.env.EXPO_PUBLIC_COMPANY!}`), []);

  useEffect(() => {

    setIsLoading(true);
    setError(null);

    const fetch = async () => {
      const country = resolveWebshopCountry();
      const items = await service.getListByCountry(country);
      setProducts(items);
      setIsLoading(false);
    }

    fetch();
  }, [service]);

  return {
    products,
    isLoading,
    error,
  };
}
