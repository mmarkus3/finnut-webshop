import { fetchPaymentMethods } from '@/hooks/paymentMethods';

describe('payment methods helper', () => {
  it('maps paymentMethods array response to normalized items', async () => {
    const request = jest.fn().mockResolvedValue({
      data: {
        paymentMethods: [
          { id: 'pm1', name: 'Card' },
          { code: 'mobilepay', title: 'MobilePay' },
        ],
      },
    });

    const methods = await fetchPaymentMethods({ request } as never);

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      url: `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/paymentMethods`,
    });
    expect(methods).toEqual([
      { id: 'pm1', name: 'Card' },
      { id: 'mobilepay', name: 'MobilePay' },
    ]);
  });

  it('returns empty array for unknown payload shape', async () => {
    const request = jest.fn().mockResolvedValue({ data: { nope: [] } });
    const methods = await fetchPaymentMethods({ request } as never);
    expect(methods).toEqual([]);
  });
});
