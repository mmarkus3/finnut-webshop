import { Product } from '@/types/product';
import { RestService } from './db';

export class ProductsService extends RestService<Product> {
  public constructor(baseUrl: string, baseRoute: string) {
    super(baseUrl, baseRoute);
  }
}