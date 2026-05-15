import {
  getAvailabilityStatusMeta,
} from '@/components/product/availabilityStatus';
import {
  getFirstUsableProductImage,
  getProductDescription,
  getProductIdentifier,
  getProductPrice,
} from '@/components/product/cardUtils';
import { useCart } from '@/hooks/cart';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

interface HomeCategoryProductSectionsProps {
  categories: Category[];
  products: Product[];
}

interface CategoryProductSection {
  category: Category;
  products: Product[];
}

const placeholderImageSource = { uri: Asset.fromModule(require('../../assets/images/fallback.png')).uri };

const getCategoryTranslationKey = (categoryId: string) => `categories.${categoryId}.name`;

const groupProductsByCategory = (categories: Category[], products: Product[]): CategoryProductSection[] => {
  const grouped = new Map<string, Product[]>();

  for (const product of products) {
    if (!product.category) {
      continue;
    }

    const categoryProducts = grouped.get(product.category) ?? [];
    categoryProducts.push(product);
    grouped.set(product.category, categoryProducts);
  }

  return categories
    .map((category) => ({
      category,
      products: grouped.get(category.id) ?? [],
    }))
    .filter((section) => section.products.length > 0);
};

function ProductCard({ product }: { product: Product }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { addItem, canAddItem } = useCart();
  const firstImage = getFirstUsableProductImage(product);
  const description = getProductDescription(product, i18n.language);
  const price = getProductPrice(product);
  const canAdd = canAddItem(product);
  const availabilityStatus = getAvailabilityStatusMeta(product.amount);

  const openProduct = () => {
    router.push({
      pathname: '/product/[productId]',
      params: { productId: getProductIdentifier(product) },
    });
  };

  return (
    <Pressable
      onPress={openProduct}
      className="mr-3 w-64 rounded-xl border border-neutral-200 bg-white p-2"
      accessibilityRole="button"
      accessibilityLabel={t('home.productCardA11yLabel', { product: product.name })}
      focusable
    >
      <Image
        source={firstImage ? { uri: firstImage } : placeholderImageSource}
        defaultSource={placeholderImageSource}
        className="h-32 w-full rounded-lg bg-neutral-100"
      />
      <Text numberOfLines={2} className="mt-2 text-sm font-medium text-neutral-900">
        {product.name}
      </Text>
      <Text className="mt-1 text-sm text-neutral-700">
        {t('category.priceLabel', {
          price: price !== null ? price.toFixed(2) : t('category.priceUnavailable'),
        })}
      </Text>
      <View className={`mt-2 self-start rounded-full px-2 py-1 ${availabilityStatus.bgClassName}`}>
        <Text className={`text-xs font-medium ${availabilityStatus.textClassName}`}>{t(availabilityStatus.labelKey)}</Text>
      </View>
      <Text numberOfLines={3} className="mt-1 text-sm text-neutral-600">
        {description || ''}
      </Text>
      <Pressable
        onPress={() => addItem(product)}
        disabled={!canAdd}
        className={`mt-3 items-center rounded-lg px-3 py-2 ${canAdd ? 'bg-primary-600' : 'bg-neutral-300'}`}
        accessibilityRole="button"
        accessibilityLabel={t('cart.addA11yLabel', { product: product.name })}
      >
        <Text className="text-sm font-medium text-white">{t('cart.addButton')}</Text>
      </Pressable>
    </Pressable>
  );
}

export function HomeCategoryProductSections({ categories, products }: HomeCategoryProductSectionsProps) {
  const { t } = useTranslation();
  const sections = groupProductsByCategory(categories, products);

  if (sections.length === 0) {
    return (
      <View className="px-4 py-2">
        <Text className="text-sm text-neutral-500">{t('home.noCategoryProducts')}</Text>
      </View>
    );
  }

  return (
    <View className="w-full gap-6 px-4 py-4">
      {sections.map((section) => (
        <View key={section.category.id} className="gap-3">
          <Text className="text-lg font-semibold text-neutral-900">
            {t(getCategoryTranslationKey(section.category.id), { defaultValue: section.category.name })}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            accessibilityRole="adjustable"
            accessibilityLabel={t('home.categoryCarouselA11yLabel', {
              category: t(getCategoryTranslationKey(section.category.id), { defaultValue: section.category.name }),
            })}
          >
            {section.products.map((product, index) => (
              <ProductCard key={`${section.category.id}-${product.id ?? product.name}-${index}`} product={product} />
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
}

export { groupProductsByCategory };
