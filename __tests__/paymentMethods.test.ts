import { fetchPaymentMethods } from '@/hooks/paymentMethods';

describe('payment methods helper', () => {
  it('maps paymentMethods array response to normalized items', async () => {
    const request = jest.fn().mockResolvedValue({
      data: {
        paymentMethods: [
          { selected_value: ' pm1 ', name: ' Card ', img: ' https://example.com/card.png ' },
          { selected_value: ' mobilepay ', name: ' MobilePay ' },
        ],
      },
    });

    const methods = await fetchPaymentMethods({ request } as never);

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      url: `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/paymentMethods`,
    });
    expect(methods).toEqual([
      { id: 'pm1', name: 'Card', img: 'https://example.com/card.png' },
      { id: 'mobilepay', name: 'MobilePay', img: '' },
    ]);
  });

  it('returns empty array for unknown payload shape', async () => {
    const request = jest.fn().mockResolvedValue({ data: { nope: [] } });
    const methods = await fetchPaymentMethods({ request } as never);
    expect(methods).toEqual([]);
  });
});
