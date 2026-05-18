import { CategoryProductGrid } from '@/components/category/CategoryProductGrid';
import { AppPageWithInfoLink } from '@/components/layout/AppPageWithInfoLink';
import { useCategories } from '@/hooks/categories';
import { useProducts } from '@/hooks/products';
import { useLocalSearchParams } from 'expo-router';

export default function CategoryListingScreen() {
  const params = useLocalSearchParams<{ categoryId?: string }>();
  const categoryId = params.categoryId ?? '';
  const { categories } = useCategories();
  const { products, isLoading } = useProducts();

  return (
    <AppPageWithInfoLink>
      <CategoryProductGrid
        categories={categories}
        categoryId={categoryId}
        products={products}
        isLoading={isLoading}
      />
    </AppPageWithInfoLink>
  );
}
