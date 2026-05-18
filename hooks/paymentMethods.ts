import { AxiosInstance, create } from 'axios';

interface RawPaymentMethod {
  id?: string;
  code?: string;
  name?: string;
  title?: string;
  label?: string;
}

interface PaymentMethodsResponse {
  paymentMethods?: RawPaymentMethod[];
  methods?: RawPaymentMethod[];
}

interface PaymentMethod {
  id: string;
  name: string;
}

const buildPaymentMethodsClient = (): AxiosInstance => {
  return create({
    baseURL: process.env.EXPO_PUBLIC_FIREBASE_API!,
  });
};

const normalizePaymentMethod = (method: RawPaymentMethod, index: number): PaymentMethod => {
  const id = method.id?.trim() || method.code?.trim() || `${method.name ?? method.title ?? 'payment'}-${index}`;
  const name = method.name?.trim() || method.title?.trim() || method.label?.trim() || `Payment method ${index + 1}`;
  return { id, name };
};

const fetchPaymentMethods = async (
  client: AxiosInstance = buildPaymentMethodsClient()
): Promise<PaymentMethod[]> => {
  const response = await client.request<RawPaymentMethod[] | PaymentMethodsResponse>({
    method: 'GET',
    url: `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/paymentMethods`,
  });

  const data = response.data;
  const methods = Array.isArray(data)
    ? data
    : Array.isArray(data?.paymentMethods)
      ? data.paymentMethods
      : Array.isArray(data?.methods)
        ? data.methods
        : [];

  return methods.map((method, index) => normalizePaymentMethod(method, index));
};

export { fetchPaymentMethods, type PaymentMethod };
