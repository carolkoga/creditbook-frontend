import axios, {
  AxiosResponse, Method, AxiosRequestConfig,
} from 'axios';

export class HttpClient {
  private baseURL: string;

  private headers: { [key: string]: string | number | object | any };

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.headers = {};
  }

  get<ResponseData = any>(endpoint: string, options?: AxiosRequestConfig) {
    return this.makeRequest<ResponseData>(endpoint, 'GET', options);
  }

  post<ResponseData = any>(endpoint: string, data: any, options?: AxiosRequestConfig) {
    return this.makeRequest<ResponseData>(endpoint, 'POST', { ...options, data });
  }

  put<ResponseData = any>(endpoint: string, options?: AxiosRequestConfig) {
    return this.makeRequest<ResponseData>(endpoint, 'PUT', options);
  }

  delete<ResponseData = any>(endpoint: string, options?: AxiosRequestConfig) {
    return this.makeRequest<ResponseData>(endpoint, 'DELETE', options);
  }

  addAuthorizationToken(token: string) {
    Object.assign(this.headers, { Authorization: `Bearer ${token}` });
  }

  removeAuthorizationToken() {
    delete this.headers.Authorization;
  }

  private async makeRequest<
  ResponseData>(endpoint: string, method: Method, options?: AxiosRequestConfig) {
    try {
      const endpointParsed = endpoint.split('')[0] === '/' ? endpoint : `/${endpoint}`;
      const response = await axios({
        method,
        url: `${this.baseURL}${endpointParsed}`,
        ...options,
        headers: {
          ...options?.headers,
          ...this.headers,
        },
      });

      let body: AxiosResponse<ResponseData>['data'] | null = null;

      const contentType = response.headers['content-type'];
      if (contentType.includes('application/json')) {
        body = await response.data;
      }

      if (response.status >= 200 && response.status <= 299) {
        return body;
      }
    } catch (error: any) {
      const { statusText, status: statusCode } = error.response;
      const errorMessage = error.response.data.error;

      const messageWithMessageError = `${statusCode} - ${errorMessage}`;
      const messageNoMessageError = `${statusCode} - ${statusText}`;

      const message = !errorMessage ? messageNoMessageError : messageWithMessageError;

      // eslint-disable-next-line no-console
      console.debug(message);
    }
  }
}
