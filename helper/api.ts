import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  private request: APIRequestContext;
  private token: string | null = null;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async postRequest() {
    const response = await this.request.post(
      'https://dev.rentzila.com.ua/api/auth/jwt/create/',
      {
        data: {
          email: 'txt2021@ukr.net',
          password: 'Qwerty123+',
        },
      }
    );
    const data = await this.handleResponse(response);
    this.token = data.access;
    return data;
  }

  async getRequest() {
    if (!this.token) {
      throw new Error('Token is not available. Please call postRequest first.');
    }

    const response = await this.request.get(
      'https://dev.rentzila.com.ua/api/backcall/',
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    return await this.handleResponse(response);
  }

  private async handleResponse(response: any) {
    if (response.ok()) {
      return await response.json();
    } else {
      throw new Error(
        `Request failed with status ${response.status()}: ${response.statusText()}`
      );
    }
  }
}
