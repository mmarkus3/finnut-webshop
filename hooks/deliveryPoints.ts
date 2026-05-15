import { AxiosInstance, create } from 'axios';

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

const buildDeliveryPointsClient = (): AxiosInstance => {
  return create({
    baseURL: `${process.env.EXPO_PUBLIC_FIREBASE_API!}/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/points`,
  });
};

const normalizeDeliveryPoint = (point: RawDeliveryPoint, index: number): DeliveryPoint => {
  const id = point.id?.trim() || `${point.name ?? 'point'}-${index}`;
  const name = point.name?.trim() || `Point ${index + 1}`;
  const addressParts = [point.address, point.postalCode, point.city].filter(Boolean);
  const addressLine = addressParts.length > 0 ? addressParts.join(', ') : '-';

  return { id, name, addressLine };
};

const fetchDeliveryPointsByPostalCode = async (
  postalCode: string,
  client: AxiosInstance = buildDeliveryPointsClient()
): Promise<DeliveryPoint[]> => {
  const normalizedPostalCode = postalCode.trim();
  if (!normalizedPostalCode) {
    return [];
  }

  const response = await client.request<DeliverPointResponse>({
    method: 'GET',
    params: { postalCode: normalizedPostalCode },
  });

  const points = response.data.pickupPoint;
  return points
    .map((point, index) => normalizeDeliveryPoint(point, index))
    .slice(0, DELIVERY_POINTS_LIMIT);
};

export {
  DELIVERY_POINTS_LIMIT, fetchDeliveryPointsByPostalCode, type DeliveryPoint
};

