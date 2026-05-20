import {
  getAvailabilityStatusMeta,
} from '@/components/product/availabilityStatus';
import {
  getProductDescription,
  getProductPrice,
  getUsableProductImages,
  resolveProductByIdentifier,
} from '@/components/product/cardUtils';
import { formatPriceWithCurrency } from '@/components/product/priceFormatting';
import { themeColors } from '@/constants/colors';
import { DESKTOP_MIN_WIDTH } from '@/constants/layout';
import { useCart } from '@/hooks/cart';
import { Product } from '@/types/product';
import { Asset } from 'expo-asset';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

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

const getUnitPricePerKgText = (product: Product, language: string, t: (key: string, options?: Record<string, unknown>) => string): string | null => {
  if (!Number.isFinite(product.unitPrice)) {
    return null;
  }

  const formattedUnitPrice = formatPriceWithCurrency(product.unitPrice!, language);
  return t('product.unitPricePerKgLabel', { price: formattedUnitPrice });
};

const getProductDetailSections = (product: Product, language: string, t: (key: string, options?: Record<string, unknown>) => string): ProductDetailSection[] => {
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

const getMaxAddableQuantity = (product: Product): number => Math.max(0, Math.floor(product.amount));

const clampSelectedQuantity = (quantity: number, max: number): number => {
  if (max <= 0) {
    return 1;
  }
  return Math.min(max, Math.max(1, Math.floor(quantity)));
};

const getProductImageSlides = (imageUris: string[]): string[] => {
  return imageUris.length > 0 ? imageUris : [placeholderImageSource.uri];
};

export function ProductDetailPage({ productId, products, isLoading }: ProductDetailPageProps) {
  const { t, i18n } = useTranslation();
  const { addItem, canAddItem } = useCart();
  const { width } = useWindowDimensions();
  const isDesktop = isDesktopWidth(width);

  const product = useMemo(() => resolveProductByIdentifier(products, productId), [productId, products]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    setSelectedQuantity(1);
  }, [productId]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [productId]);

  useEffect(() => {
    setCarouselWidth(0);
  }, [isDesktop, width]);

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

  const imageUris = getUsableProductImages(product);
  const imageSlides = getProductImageSlides(imageUris);
  const price = getProductPrice(product);
  const unitPricePerKg = getUnitPricePerKgText(product, i18n.language, t);
  const canAdd = canAddItem(product);
  const sections = getProductDetailSections(product, i18n.language, t);
  const availabilityStatus = getAvailabilityStatusMeta(product.amount);
  const maxAddableQuantity = getMaxAddableQuantity(product);
  const clampedSelectedQuantity = clampSelectedQuantity(selectedQuantity, maxAddableQuantity);
  const canDecreaseQuantity = clampedSelectedQuantity > 1;
  const canIncreaseQuantity = clampedSelectedQuantity < maxAddableQuantity;
  const showPagination = imageSlides.length > 1;

  const handleCarouselScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewportWidth = event.nativeEvent.layoutMeasurement.width;
    if (!viewportWidth) {
      return;
    }
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / viewportWidth);
    setActiveImageIndex(Math.max(0, Math.min(nextIndex, imageSlides.length - 1)));
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16 }}>
      <View className={isDesktop ? 'flex-row gap-6' : 'flex-col gap-4'}>
        <View className={isDesktop ? 'w-1/2' : 'w-full'}>
          <View
            className="gap-3 w-full"
            onLayout={(event) => {
              const nextWidth = Math.round(event.nativeEvent.layout.width);
              if (nextWidth > 0 && nextWidth !== carouselWidth) {
                setCarouselWidth(nextWidth);
              }
            }}
          >
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={isDesktop}
              onScroll={handleCarouselScroll}
              scrollEventThrottle={16}
              className="w-full"
            >
              {imageSlides.map((imageUri, index) => (
                <View
                  key={`${imageUri}-${index}`}
                  style={{ width: carouselWidth || undefined }}
                  className={carouselWidth ? '' : 'w-full'}
                >
                  <Image
                    source={imageUri === placeholderImageSource.uri ? placeholderImageSource : { uri: imageUri }}
                    defaultSource={placeholderImageSource}
                    style={{ resizeMode: 'contain' }}
                    className={isDesktop ? 'h-[520px] w-full rounded-xl bg-neutral-100' : 'h-80 w-full rounded-xl bg-neutral-100'}
                    accessibilityRole="image"
                    accessibilityLabel={t('product.imageA11yLabel', { product: product.name })}
                  />
                </View>
              ))}
            </ScrollView>
            {showPagination ? (
              <View className="flex-row items-center justify-center gap-2">
                {imageSlides.map((_, index) => (
                  <View
                    key={`dot-${index}`}
                    className={`h-2 w-2 rounded-full ${index === activeImageIndex ? 'bg-neutral-800' : 'bg-neutral-300'}`}
                    accessibilityRole="none"
                  />
                ))}
              </View>
            ) : null}
          </View>
        </View>

        <View className={isDesktop ? 'w-1/2 gap-2' : 'w-full gap-2'}>
          <Text className="text-2xl font-semibold text-neutral-900">{product.name}</Text>
          <Text className="text-xl text-neutral-600 font-semibold">
            {t('category.priceLabel', {
              price: price !== null ? formatPriceWithCurrency(price, i18n.language) : t('category.priceUnavailable'),
            })}
          </Text>
          {unitPricePerKg ? <Text className="text-xs text-neutral-600">{unitPricePerKg}</Text> : null}
          <View className={`mt-1 self-start rounded-full px-2 py-1 ${availabilityStatus.bgClassName}`}>
            <Text className={`text-xs font-medium ${availabilityStatus.textClassName}`}>{t(availabilityStatus.labelKey)}</Text>
          </View>
          <Text className="text-sm text-neutral-700">{t('product.eanLabel', { ean: product.ean })}</Text>

          <View className="mt-3 flex-row items-center gap-2">
            <Pressable
              onPress={() => setSelectedQuantity((prev) => clampSelectedQuantity(prev - 1, maxAddableQuantity))}
              disabled={!canDecreaseQuantity}
              className={`rounded-md px-3 py-1 ${canDecreaseQuantity ? 'border border-neutral-300' : 'border border-neutral-200 bg-neutral-100'}`}
              accessibilityRole="button"
              accessibilityLabel={t('product.decreaseQuantityA11yLabel', { product: product.name })}
            >
              <Text className={`${canDecreaseQuantity ? 'text-neutral-900' : 'text-neutral-400'}`}>-</Text>
            </Pressable>
            <Text className="min-w-8 text-center text-sm font-medium text-neutral-900">{clampedSelectedQuantity}</Text>
            <Pressable
              onPress={() => setSelectedQuantity((prev) => clampSelectedQuantity(prev + 1, maxAddableQuantity))}
              disabled={!canIncreaseQuantity}
              className={`rounded-md px-3 py-1 ${canIncreaseQuantity ? 'border border-neutral-300' : 'border border-neutral-200 bg-neutral-100'}`}
              accessibilityRole="button"
              accessibilityLabel={t('product.increaseQuantityA11yLabel', { product: product.name })}
            >
              <Text className={`${canIncreaseQuantity ? 'text-neutral-900' : 'text-neutral-400'}`}>+</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => addItem(product, clampedSelectedQuantity)}
            disabled={!canAdd || maxAddableQuantity <= 0}
            className={`mt-3 w-52 items-center rounded-lg px-3 py-2 ${canAdd && maxAddableQuantity > 0 ? 'bg-primary-600' : 'bg-neutral-300'}`}
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

export {
  clampSelectedQuantity,
  formatOptionalNumber,
  getLocalizedIngredients,
  getMaxAddableQuantity,
  getProductDetailSections,
  getProductImageSlides,
  getUnitPricePerKgText,
  isDesktopWidth
};
