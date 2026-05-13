import { CategoriesService } from '@/services/category';
import { Category } from '@/types/category';
import { useEffect, useMemo, useState } from 'react';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => new CategoriesService(process.env.EXPO_PUBLIC_FIREBASE_API!, `/categories/company/${process.env.EXPO_PUBLIC_COMPANY!}`), []);

  useEffect(() => {

    setIsLoading(true);
    setError(null);

    const fetch = async () => {
      const items = await service.getList();
      setCategories(items);
      setIsLoading(false);
    }

    fetch();
  }, [service]);

  return {
    categories,
    isLoading,
    error,
  };
}