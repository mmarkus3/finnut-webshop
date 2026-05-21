import { getJson, HttpRequester } from '@/hooks/httpFetch';

interface RawPaymentMethod {
  selected_value?: string;
  name?: string;
  img?: string;
}

interface PaymentMethodsResponse {
  paymentMethods?: RawPaymentMethod[];
  methods?: RawPaymentMethod[];
}

interface PaymentMethod {
  id: string;
  name: string;
  img: string;
}

const normalizePaymentMethod = (method: RawPaymentMethod): PaymentMethod => {
  const id = method.selected_value?.trim() ?? '';
  const name = method.name?.trim() ?? '';
  const img = method.img?.trim() ?? '';
  return { id, name, img };
};

const fetchPaymentMethods = async (
  requester?: HttpRequester
): Promise<PaymentMethod[]> => {
  const data = await getJson<RawPaymentMethod[] | PaymentMethodsResponse>(
    process.env.EXPO_PUBLIC_FIREBASE_API!,
    { url: `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/paymentMethods` },
    requester
  );

  const methods = Array.isArray(data)
    ? data
    : Array.isArray(data?.paymentMethods)
      ? data.paymentMethods
      : Array.isArray(data?.methods)
        ? data.methods
        : [];

  return methods.map((method) => normalizePaymentMethod(method));
};

export { fetchPaymentMethods, type PaymentMethod };
