import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmoCrmService {
  private readonly baseURL: string;
  private readonly integrationId: string;
  private readonly secretKey: string;
  private readonly authorizationCode: string;
  private accessToken: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.baseURL = this.configService.get<string>('AMOCRM_BASE_URL');
    this.integrationId = this.configService.get<string>('AMOCRM_INTEGRATION_ID');
    this.secretKey = this.configService.get<string>('AMOCRM_SECRET_KEY');
    this.authorizationCode = this.configService.get<string>('AMOCRM_AUTHORIZATION_CODE');
    this.accessToken = this.configService.get<string>('AMOCRM_ACCESS_TOKEN');
    this.getAccessToken();
  }

  private async getAccessToken() {
    const url = `${this.baseURL}/oauth2/access_token`;
    const data = {
      client_id: this.integrationId,
      client_secret: this.secretKey,
      grant_type: 'authorization_code',
      code: this.authorizationCode,
      redirect_uri: 'https://example.com', // Замените на ваш redirect URI
    };

    try {
      const response = await this.httpService.post(url, data).toPromise();
      this.accessToken = response.data.access_token;
    } catch (error) {
      console.error('Failed to get access token', error);
    }
  }

  async getLeads(query?: string) {
    const url = `${this.baseURL}/api/v4/leads`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };
    const params = query ? { query } : {};

    const response = await this.httpService.get(url, { headers, params }).toPromise();
    return response.data;
  }
}
