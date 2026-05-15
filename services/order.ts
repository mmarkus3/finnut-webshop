import { Order } from '@/types/order';
import { RestService } from './db';

export class OrdersService extends RestService<Order> {
  public constructor(baseUrl: string, baseRoute: string) {
    super(baseUrl, baseRoute);
  }
}