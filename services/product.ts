import { Product } from '@/types/product';
import { RestService } from './db';
import { WebshopCountry } from '@/hooks/countryConfig';

export class ProductsService extends RestService<Product> {
  public constructor(baseUrl: string, baseRoute: string) {
    super(baseUrl, baseRoute);
  }

  async getListByCountry(country: WebshopCountry): Promise<Product[]> {
    const response = await this.client.request<Product[]>({
      method: 'GET',
      params: { country },
    });

    return response.data;
  }
}
