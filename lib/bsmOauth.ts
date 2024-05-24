import axios, { isAxiosError } from 'axios';
import { RawBsmOAuthResource, RawBsmOAuthToken } from './types/rawOAuthType.js';
import { BsmStudentResource } from './types/student.js';
import { BsmTeacherResource } from './types/teacher.js';
import { ResourceMapper } from './resourceMapper.js';
import { ErrorHandler } from './errorHandler.js';

export default class BsmOauth {
  constructor(clientId: string, clientSecret: string) {
    this.bsmAuthPayload = {
      clientId,
      clientSecret
    };
  }

  private bsmAuthPayload: {
    clientId: string;
    clientSecret: string;
  };
  private readonly BSM_AUTH_TOKEN_URL: string = 'https://api-auth.bssm.app/api/oauth/token';
  private readonly BSM_AUTH_RESOURCE_URL: string = 'https://api-auth.bssm.app/api/oauth/resource';

  public async getToken(authCode: string): Promise<string> {
    try {
      return (
        await axios.post<RawBsmOAuthToken>(this.BSM_AUTH_TOKEN_URL, {
          ...this.bsmAuthPayload,
          authCode
        })
      ).data.token;
    } catch (error) {
      isAxiosError(error) && ErrorHandler.handleToken(error);
      throw error;
    }
  }

  public async getResource(token: string): Promise<BsmStudentResource | BsmTeacherResource> {
    const resource = await this.getRawResource(token);
    return ResourceMapper.toResource(resource);
  }

  public async getRawResource(token: string): Promise<RawBsmOAuthResource> {
    try {
      return (
        await axios.post<{ user: RawBsmOAuthResource }>(this.BSM_AUTH_RESOURCE_URL, {
          ...this.bsmAuthPayload,
          token
        })
      ).data.user;
    } catch (error) {
      isAxiosError(error) && ErrorHandler.handleResource(error);
      throw error;
    }
  }
}
