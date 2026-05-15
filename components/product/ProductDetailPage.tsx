import {
  getFirstUsableProductImage,
  getProductDescription,
  getProductPrice,
  resolveProductByIdentifier,
} from '@/components/product/cardUtils';
import { themeColors } from '@/constants/colors';
import { useCart } from '@/hooks/cart';
import { Product } from '@/types/product';
import { Asset } from 'expo-asset';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

interface ProductDetailPageProps {
  productId: string;
  products: Product[];
  isLoading: boolean;
}

interface ProductDetailField {
  label: string;
  value: string;
}

interface ProductDetailSection {
  title: string;
  fields: ProductDetailField[];
}

const DESKTOP_MIN_WIDTH = 1024;
const placeholderImageSource = { uri: Asset.fromModule(require('../../assets/images/fallback.png')).uri };

const isDesktopWidth = (width: number): boolean => width >= DESKTOP_MIN_WIDTH;
const formatOptionalNumber = (value?: number): string | null => (value === undefined ? null : `${value}`);

const getLocalizedIngredients = (product: Product, language: string): string | null => {
  if (language === 'en') {
    return product.ingredients_en ?? product.ingredients_fi ?? product.ingredients_sv ?? null;
  }

  if (language === 'sv') {
    return product.ingredients_sv ?? product.ingredients_fi ?? product.ingredients_en ?? null;
  }

  return product.ingredients_fi ?? product.ingredients_en ?? product.ingredients_sv ?? null;
};

const getProductDetailSections = (product: Product, language: string, t: (key: string, options?: Record<string, unknown>) => string): ProductDetailSection[] => {
  const ingredients = getLocalizedIngredients(product, language);
  const description = getProductDescription(product, language);

  const originSection: ProductDetailSection = {
    title: t('product.originSectionTitle'),
    fields: [
      {
        label: t('product.countryOfOriginLabel'),
        value: product.countryOfOrigin ?? t('product.unavailableValue'),
      },
    ],
  };

  const descriptionSection: ProductDetailSection = {
    title: t('product.descriptionLabel'),
    fields: [
      {
        label: '',
        value: description || t('product.unavailableValue'),
      },
    ],
  }

  const ingredientSection: ProductDetailSection = {
    title: t('product.ingredientsLabel'),
    fields: [
      {
        label: 'Ainesosat:',
        value: product.ingredients_fi ?? t('product.unavailableValue'),
      },
      {
        label: 'Ingredients:',
        value: product.ingredients_sv ?? t('product.unavailableValue'),
      },
    ],
  };

  const nutritionSection: ProductDetailSection = {
    title: t('product.nutritionSectionTitle'),
    fields: [
      { label: t('product.energyJouleLabel'), value: formatOptionalNumber(product.energyJoule) ?? t('product.unavailableValue') },
      { label: t('product.energyCaloryLabel'), value: formatOptionalNumber(product.energyCalory) ?? t('product.unavailableValue') },
      { label: t('product.fatLabel'), value: (formatOptionalNumber(product.fat) ?? t('product.unavailableValue')) + ' g' },
      { label: t('product.saturatedFatLabel'), value: (formatOptionalNumber(product.saturatedFat) ?? t('product.unavailableValue')) + ' g' },
      { label: t('product.carbohydrateLabel'), value: (formatOptionalNumber(product.carbohydrate) ?? t('product.unavailableValue')) + ' g' },
      { label: t('product.saturatedCarbohydrateLabel'), value: (formatOptionalNumber(product.saturatedCarbohydrate) ?? t('product.unavailableValue')) + ' g' },
      { label: t('product.proteinLabel'), value: (formatOptionalNumber(product.protein) ?? t('product.unavailableValue')) + ' g' },
      { label: t('product.saltLabel'), value: (formatOptionalNumber(product.salt) ?? t('product.unavailableValue')) + ' g' },
      { label: t('product.fiberLabel'), value: (formatOptionalNumber(product.fiber) ?? t('product.unavailableValue')) + ' g' },
    ],
  };

  return [descriptionSection, ingredientSection, nutritionSection, originSection];
};

export function ProductDetailPage({ productId, products, isLoading }: ProductDetailPageProps) {
  const { t, i18n } = useTranslation();
  const { addItem, canAddItem } = useCart();
  const { width } = useWindowDimensions();
  const isDesktop = isDesktopWidth(width);

  const product = useMemo(() => resolveProductByIdentifier(products, productId), [productId, products]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={themeColors.primary[600]} />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 bg-white px-4 py-6">
        <Text className="text-2xl font-semibold text-neutral-900">{t('product.notFoundTitle')}</Text>
        <Text className="mt-2 text-sm text-neutral-600">{t('product.notFoundDescription')}</Text>
      </View>
    );
  }

  const imageUri = getFirstUsableProductImage(product);
  const price = getProductPrice(product);
  const canAdd = canAddItem(product);
  const sections = getProductDetailSections(product, i18n.language, t);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16 }}>
      <View className={isDesktop ? 'flex-row gap-6' : 'flex-col gap-4'}>
        <View className={isDesktop ? 'w-1/2' : 'w-full'}>
          <Image
            source={imageUri ? { uri: imageUri } : placeholderImageSource}
            defaultSource={placeholderImageSource}
            className={isDesktop ? 'h-[520px] w-full rounded-xl bg-neutral-100' : 'h-80 w-full rounded-xl bg-neutral-100'}
            accessibilityRole="image"
            accessibilityLabel={t('product.imageA11yLabel', { product: product.name })}
          />
        </View>

        <View className={isDesktop ? 'w-1/2 gap-2' : 'w-full gap-2'}>
          <Text className="text-2xl font-semibold text-neutral-900">{product.name}</Text>
          <Text className="text-sm text-neutral-700">
            {t('category.priceLabel', {
              price: price !== null ? price.toFixed(2) : t('category.priceUnavailable'),
            })}
          </Text>
          <Text className="text-sm text-neutral-700">
            {t('category.availabilityLabel', { amount: product.amount })}
          </Text>
          <Text className="text-sm text-neutral-700">{t('product.eanLabel', { ean: product.ean })}</Text>
          <Pressable
            onPress={() => addItem(product)}
            disabled={!canAdd}
            className={`mt-3 w-52 items-center rounded-lg px-3 py-2 ${canAdd ? 'bg-primary-600' : 'bg-neutral-300'}`}
            accessibilityRole="button"
            accessibilityLabel={t('cart.addA11yLabel', { product: product.name })}
          >
            <Text className="text-sm font-medium text-white">{t('cart.addButton')}</Text>
          </Pressable>

          <View className="mt-4 gap-4">
            {sections.map((section) => (
              <View key={section.title} className="rounded-xl border border-neutral-200 p-3">
                <Text className="text-base font-semibold text-neutral-900">{section.title}</Text>
                <View className="mt-2 gap-1">
                  {section.fields.map((field) => (
                    <Text key={`${section.title}-${field.label}`} className="text-sm leading-5 text-neutral-700">
                      <Text className="font-medium text-neutral-800">{field.label} </Text>
                      {field.value}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export { formatOptionalNumber, getLocalizedIngredients, getProductDetailSections, isDesktopWidth };

