import { SearchResultsPage } from '@/components/search/SearchResultsPage';
import { useProducts } from '@/hooks/products';
import { useLocalSearchParams } from 'expo-router';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string }>();
  const { products, isLoading } = useProducts();

  return <SearchResultsPage products={products} query={params.q ?? ''} isLoading={isLoading} />;
}
