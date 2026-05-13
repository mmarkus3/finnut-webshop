import { AxiosInstance, create } from 'axios';

export interface QueryOptions {
  top?: number;
  skip?: number;
}

export interface Entity {
  id?: string;
  created?: Date;
  updated?: Date
}

export abstract class RestService<T extends Entity> {
  protected client: AxiosInstance;

  constructor(baseUrl: string, baseRoute: string) {
    this.client = create({
      baseURL: `${baseUrl}${baseRoute}`
    });
  }

  async getList(queryOptions?: QueryOptions): Promise<T[]> {
    const response = await this.client.request<T[]>({
      method: 'GET',
      data: queryOptions
    });

    return response.data;
  }

  async get(id: string): Promise<T> {
    const response = await this.client.request<T>({
      method: 'GET',
      url: id
    });

    return response.data
  }

  async save(entity: T): Promise<T> {
    return entity.id
      ? await this.put(entity)
      : await this.post(entity);
  }

  async delete(id: string): Promise<void> {
    await this.client.request<void>({
      method: 'DELETE',
      url: id
    });
  }

  private async post(entity: T): Promise<T> {
    const response = await this.client.request<T>({
      method: 'POST',
      data: entity
    });

    return response.data;
  }

  private async put(entity: T): Promise<T> {
    const response = await this.client.request<T>({
      method: 'PUT',
      url: entity.id,
      data: entity
    });

    return response.data;
  }

  async patch(id: string, entity: Partial<T>): Promise<T> {
    const response = await this.client.request<T>({
      method: 'PATCH',
      url: id,
      data: entity
    });

    return response.data;
  }
}