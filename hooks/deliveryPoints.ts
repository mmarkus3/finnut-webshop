import { getJson, HttpRequester } from '@/hooks/httpFetch';
import { resolveWebshopCountry } from '@/hooks/countryConfig';

const DELIVERY_POINTS_LIMIT = 10;

interface DeliverPointResponse {
  pickupPoint: RawDeliveryPoint[];
}

interface RawDeliveryPoint {
  id?: string;
  name?: string;
  address?: string;
  postalCode?: string;
  city?: string;
}

interface DeliveryPoint {
  id: string;
  name: string;
  addressLine: string;
}

const normalizeDeliveryPoint = (point: RawDeliveryPoint, index: number): DeliveryPoint => {
  const id = point.id?.trim() || `${point.name ?? 'point'}-${index}`;
  const name = point.name?.trim() || `Point ${index + 1}`;
  const addressParts = [point.address, point.postalCode, point.city].filter(Boolean);
  const addressLine = addressParts.length > 0 ? addressParts.join(', ') : '-';

  return { id, name, addressLine };
};

const fetchDeliveryPointsByPostalCode = async (
  postalCode: string,
  requester?: HttpRequester
): Promise<DeliveryPoint[]> => {
  const normalizedPostalCode = postalCode.trim();
  if (!normalizedPostalCode) {
    return [];
  }
  const country = resolveWebshopCountry();

  const data = await getJson<DeliverPointResponse>(
    `${process.env.EXPO_PUBLIC_FIREBASE_API!}/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/points`,
    { params: { postalCode: normalizedPostalCode, country } },
    requester
  );

  const points = Array.isArray(data.pickupPoint) ? data.pickupPoint : [];
  return points
    .map((point, index) => normalizeDeliveryPoint(point, index))
    .slice(0, DELIVERY_POINTS_LIMIT);
};

export {
  DELIVERY_POINTS_LIMIT, fetchDeliveryPointsByPostalCode, type DeliveryPoint
};
