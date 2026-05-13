import { ProductDetailPage } from '@/components/product/ProductDetailPage';
import { useProducts } from '@/hooks/products';
import { useLocalSearchParams } from 'expo-router';

export default function ProductScreen() {
  const params = useLocalSearchParams<{ productId?: string }>();
  const productId = params.productId ?? '';
  const { products, isLoading } = useProducts();

  return <ProductDetailPage productId={productId} products={products} isLoading={isLoading} />;
}
