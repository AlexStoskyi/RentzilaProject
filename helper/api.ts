import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  private request: APIRequestContext;
  private token: string | null = null;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.checkEnvVariables();
  }

  private baseUrl = process.env.BASE_URL;
  private adminPassword = process.env.ADMIN_PASSWORD;
  private adminEmail = process.env.ADMIN_EMAIL;

  private checkEnvVariables() {
    if (!this.baseUrl || !this.adminPassword || !this.adminEmail) {
      throw new Error(
        'BASE_URL, ADMIN_PASSWORD, or ADMIN_EMAIL environment variables are not defined.'
      );
    }
  }

  async createAdminToken() {
    const response = await this.request.post(
      this.baseUrl + '/api/auth/jwt/create/',
      {
        data: {
          email: this.adminEmail,
          password: this.adminPassword,
        },
      }
    );
    const data = await this.handleResponse(response);
    this.token = data.access;
    return data;
  }

  async getFeedbackList() {
    if (!this.token) {
      throw new Error('Token is not available. Please call postRequest first.');
    }

    const response = await this.request.get(this.baseUrl + '/api/backcall/', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return await this.handleResponse(response);
  }

  private async handleResponse(response: any) {
    if (response.ok()) {
      return await response.json();
    } else {
      this.createAdminToken();
    }
  }
}
