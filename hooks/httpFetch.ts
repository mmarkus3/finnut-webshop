import { AxiosRequestConfig, AxiosResponse, create } from 'axios';

interface HttpRequester {
  request: <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

const createRequester = (baseURL: string): HttpRequester => {
  return create({ baseURL });
};

const getJson = async <T>(
  baseURL: string,
  config: AxiosRequestConfig,
  requester: HttpRequester = createRequester(baseURL)
): Promise<T> => {
  const response = await requester.request<T>({
    method: 'GET',
    ...config,
  });

  return response.data;
};

export { createRequester, getJson, type HttpRequester };
