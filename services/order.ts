import { Order } from '@/types/order';
import { RestService } from './db';

export class OrdersService extends RestService<Order> {
  public constructor(baseUrl: string, baseRoute: string) {
    super(baseUrl, baseRoute);
  }

  async placeOrder(orderId: string) {
    const response = await this.client.request({
      url: `/place`,
      method: 'POST',
      data: { orderId },
    });
    return response.data as { url: string };
  }
}