import { Category } from '@/types/category';
import { RestService } from './db';

export class CategoriesService extends RestService<Category> {
  public constructor(baseUrl: string, baseRoute: string) {
    super(baseUrl, baseRoute);
  }
}