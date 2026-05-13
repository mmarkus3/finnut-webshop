import { useCategories } from '@/hooks/categories';
import { useProducts } from '@/hooks/products';
import { Text, View } from "react-native";

export default function Index() {
  const { categories } = useCategories();
  const { products } = useProducts();

  return (
    <View
      className='flex-1 items-center justify-center'
    >
      <Text>Verkkokauppa.</Text>
    </View>
  );
}
