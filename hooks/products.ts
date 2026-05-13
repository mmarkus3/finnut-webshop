import { ProductsService } from '@/services/product';
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
      const items = await service.getList();
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