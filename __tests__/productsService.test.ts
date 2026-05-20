import { ProductsService } from '@/services/product';

describe('ProductsService country query', () => {
  it('requests product list with country query parameter', async () => {
    const service = new ProductsService('https://api.test', '/products/company/demo');
    const request = jest.fn().mockResolvedValue({ data: [{ id: 'p1', name: 'Apple', amount: 1, ean: '1', images: [] }] });
    (service as unknown as { client: { request: typeof request } }).client = { request };

    const items = await service.getListByCountry('SE');

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      params: { country: 'SE' },
    });
    expect(items).toHaveLength(1);
  });
});
