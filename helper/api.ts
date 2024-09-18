import { APIRequestContext } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


export class ApiHelper {
  private request: APIRequestContext;
  private token: string | null = null;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private bUrl: string | undefined = process.env.BASE_URL;
  private adminPassword: string | undefined = process.env.ADMIN_PASSWORD;
  private adminEmail: string | undefined = process.env.ADMIN_EMAIL;

  async createAdminToken() {
    const response = await this.request.post(
      this.bUrl + '/api/auth/jwt/create/',
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

    const response = await this.request.get(
      this.bUrl + '/api/backcall/',
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
