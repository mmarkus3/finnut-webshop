import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ProductCard } from '../product/ProductCard';
import { getItemName } from '../product/cardUtils';

interface HomeCategoryProductSectionsProps {
  categories: Category[];
  products: Product[];
}

interface CategoryProductSection {
  category: Category;
  products: Product[];
}

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

export function HomeCategoryProductSections({ categories, products }: HomeCategoryProductSectionsProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const sections = groupProductsByCategory(categories, products);

  if (sections.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4 py-2">
        <Text className="text-sm text-neutral-500">{t('home.noCategoryProducts')}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="w-full gap-6 px-4 py-4">
      {sections.map((section) => (
        <View key={section.category.id} className="gap-3 mt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-neutral-900">
              {t(getCategoryTranslationKey(section.category.id), { defaultValue: getItemName(section.category, i18n.language) })}
            </Text>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/category/[categoryId]',
                  params: { categoryId: section.category.id },
                })
              }
              accessibilityRole="button"
              accessibilityLabel={t('home.showAllA11yLabel', {
                category: t(getCategoryTranslationKey(section.category.id), { defaultValue: getItemName(section.category, i18n.language) }),
              })}
            >
              <Text className="text-sm font-medium text-primary-700">{t('home.showAllButton')}</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            nestedScrollEnabled
            directionalLockEnabled
            contentContainerStyle={{ paddingRight: 8, gap: 16 }}
            showsHorizontalScrollIndicator={true}
            accessibilityRole="adjustable"
            accessibilityLabel={t('home.categoryCarouselA11yLabel', {
              category: t(getCategoryTranslationKey(section.category.id), { defaultValue: getItemName(section.category, i18n.language) }),
            })}
          >
            {section.products.map((product, index) => (
              <ProductCard key={`${section.category.id}-${product.id}-${index}`} item={product} width={'w-64'} />
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

export { groupProductsByCategory };
