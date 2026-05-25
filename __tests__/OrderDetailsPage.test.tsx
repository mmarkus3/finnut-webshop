import {
  getOrderStatusStepState,
  getOrderTotal,
  getTimelineStepClassName,
  OrderDetailsPage,
} from '@/components/order/OrderDetailsPage';
import React from 'react';
import renderer from 'react-test-renderer';

const mockFetchOrderDetails = jest.fn();

jest.mock('@/hooks/orderDetails', () => ({
  fetchOrderDetails: (...args: unknown[]) => mockFetchOrderDetails(...args),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'fi' },
    t: (key: string, values?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        'orderDetails.title': 'Tilauksen tiedot',
        'orderDetails.orderIdLabel': 'Tilausnumero: {{orderId}}',
        'orderDetails.loading': 'Ladataan tilausta...',
        'orderDetails.missingTitle': 'Tilausta ei voida näyttää',
        'orderDetails.missingBody': 'Tilauksen tunniste puuttuu linkistä.',
        'orderDetails.errorTitle': 'Tilauksen lataaminen epäonnistui',
        'orderDetails.errorBody': 'Tilauksen tietoja ei voitu hakea.',
        'orderDetails.statusTitle': 'Tilauksen tila',
        'orderDetails.unknownStatus': 'Tilauksen nykyistä tilaa ei tunnistettu.',
        'orderDetails.statusStepA11yLabel': '{{status}}, {{state}}',
        'orderDetails.status.draft': 'Luonnos',
        'orderDetails.status.pending': 'Odottaa käsittelyä',
        'orderDetails.status.placed': 'Vastaanotettu',
        'orderDetails.status.sent': 'Lähetetty',
        'orderDetails.statusState.complete': 'valmis',
        'orderDetails.statusState.current': 'nykyinen',
        'orderDetails.statusState.future': 'tuleva',
        'orderDetails.statusState.unknown': 'ei vahvistettu',
        'orderDetails.productsTitle': 'Tilatut tuotteet',
        'orderDetails.amountLabel': 'Määrä: {{amount}}',
        'orderDetails.priceUnavailable': 'Hinta ei saatavilla',
        'orderDetails.summaryTitle': 'Tilausyhteenveto',
        'orderDetails.totalLabel': 'Yhteensä',
        'orderDetails.totalUnavailable': 'Ei saatavilla',
        'orderDetails.customerTitle': 'Asiakastiedot',
        'orderDetails.customerNameLabel': 'Nimi',
        'orderDetails.customerEmailLabel': 'Sähköposti',
        'orderDetails.customerPhoneLabel': 'Puhelinnumero',
        'orderDetails.customerAddressLabel': 'Osoite',
        'orderDetails.customerUnavailable': 'Asiakastietoja ei ole saatavilla.',
      };
      let result = translations[key] ?? key;
      Object.entries(values ?? {}).forEach(([name, value]) => {
        result = result.replace(`{{${name}}}`, String(value));
      });
      return result;
    },
  }),
}));

describe('OrderDetailsPage', () => {
  beforeEach(() => {
    mockFetchOrderDetails.mockReset();
  });

  it('renders missing-id and loading states without displaying order content', async () => {
    let missingTree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      missingTree = renderer.create(<OrderDetailsPage orderId={null} />);
    });
    expect(missingTree!.root.findAllByType('Text').some((node) => node.props.children === 'Tilausta ei voida näyttää')).toBe(true);
    expect(mockFetchOrderDetails).not.toHaveBeenCalled();

    mockFetchOrderDetails.mockReturnValue(new Promise(() => undefined));
    let loadingTree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      loadingTree = renderer.create(<OrderDetailsPage orderId="order-loading" />);
    });
    expect(loadingTree!.root.findAllByType('Text').some((node) => node.props.children === 'Ladataan tilausta...')).toBe(true);
  });

  it('renders retrieval error state when the request fails', async () => {
    mockFetchOrderDetails.mockRejectedValue(new Error('failed'));
    let tree: renderer.ReactTestRenderer | null = null;

    await renderer.act(async () => {
      tree = renderer.create(<OrderDetailsPage orderId="order-failed" />);
    });

    expect(tree!.root.findAllByType('Text').some((node) => node.props.children === 'Tilauksen lataaminen epäonnistui')).toBe(true);
  });

  it('renders the order timeline, products, calculated sum, and customer details', async () => {
    mockFetchOrderDetails.mockResolvedValue({
      id: 'order-123',
      status: 'placed',
      country: 'FI',
      products: [
        { id: 'one', name: 'Snack one', amount: 2, finalPrice: 3.25 },
        { id: 'two', name: 'Snack two', amount: 1, finalPrice: 1.5 },
      ],
      customer: {
        firstname: 'Aino',
        lastname: 'Asiakas',
        email: 'aino@example.fi',
        phone: '+358 40 123 4567',
        address_street: 'Katu 1',
        address_zip: '00100',
        address_city: 'Helsinki',
      },
    });
    let tree: renderer.ReactTestRenderer | null = null;

    await renderer.act(async () => {
      tree = renderer.create(<OrderDetailsPage orderId="order-123" />);
    });

    const text = tree!.root.findAllByType('Text').map((node) => node.props.children);
    expect(mockFetchOrderDetails).toHaveBeenCalledWith('order-123');
    expect(text).toContain('Tilausnumero: order-123');
    expect(text).toContain('Snack one');
    expect(text).toContain('3.25 €');
    expect(text).toContain('8.00 €');
    expect(text).toContain('Aino Asiakas');
    expect(text).toContain('aino@example.fi');

    const current = tree!.root.find(
      (node) => node.props.accessibilityLabel === 'Vastaanotettu, nykyinen'
    );
    const complete = tree!.root.find(
      (node) => node.props.accessibilityLabel === 'Odottaa käsittelyä, valmis'
    );
    const future = tree!.root.find(
      (node) => node.props.accessibilityLabel === 'Lähetetty, tuleva'
    );
    expect(current.props.className).toContain('bg-emerald-600');
    expect(complete.props.className).toContain('bg-emerald-50');
    expect(future.props.className).toContain('bg-neutral-100');
  });

  it('does not invent a total or customer information for incomplete returned data', async () => {
    mockFetchOrderDetails.mockResolvedValue({
      id: 'order-incomplete',
      status: 'unsupported',
      country: 'FI',
      products: [{ id: 'one', name: 'Unpriced snack', amount: 2 }],
    });
    let tree: renderer.ReactTestRenderer | null = null;

    await renderer.act(async () => {
      tree = renderer.create(<OrderDetailsPage orderId="order-incomplete" />);
    });

    const text = tree!.root.findAllByType('Text').map((node) => node.props.children);
    expect(text).toContain('Tilauksen nykyistä tilaa ei tunnistettu.');
    expect(text).toContain('Hinta ei saatavilla');
    expect(text).toContain('Ei saatavilla');
    expect(text).toContain('Asiakastietoja ei ole saatavilla.');
  });

  it('classifies timeline statuses and total calculations safely', () => {
    expect(getOrderStatusStepState('placed', 'pending')).toBe('complete');
    expect(getOrderStatusStepState('placed', 'placed')).toBe('current');
    expect(getOrderStatusStepState('placed', 'sent')).toBe('future');
    expect(getOrderStatusStepState('unexpected', 'draft')).toBe('unknown');
    expect(getTimelineStepClassName('current')).toContain('bg-emerald-600');
    expect(getOrderTotal([{ id: 'one', name: 'One', amount: 2, finalPrice: 4 }])).toBe(8);
    expect(getOrderTotal([{ id: 'one', name: 'One', amount: 2 }])).toBeNull();
  });
});
