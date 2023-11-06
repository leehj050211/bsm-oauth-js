import axios, { isAxiosError } from 'axios';
import BsmOauthError from './error.js';
import ErrorType from './types/errorType.js';
import { RawBsmOAuthResource, RawBsmOAuthToken } from './types/rawOAuthType.js';
import { BsmStudent, BsmStudentResource } from './types/student.js';
import { BsmTeacher, BsmTeacherResource } from './types/teacher.js';
import UserRole from './types/userRole.js';

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
  private readonly BSM_AUTH_TOKEN_URL: string = 'https://auth.bssm.kro.kr/api/oauth/token';
  private readonly BSM_AUTH_RESOURCE_URL: string = 'https://auth.bssm.kro.kr/api/oauth/resource';

  public async getToken(authCode: string): Promise<string> {
    try {
      return (
        await axios.post<RawBsmOAuthToken>(this.BSM_AUTH_TOKEN_URL, {
          ...this.bsmAuthPayload,
          authCode
        })
      ).data.token;
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            throw new BsmOauthError(ErrorType.INVALID_CLIENT, 'BSM OAuth 클라이언트 정보가 잘못되었습니다');
          case 404:
            throw new BsmOauthError(ErrorType.AUTH_CODE_NOT_FOUND, 'BSM OAuth 인증 코드를 찾을 수 없습니다');
          default:
            throw error;
        }
      }
      throw error;
    }
  }

  public async getResource(token: string): Promise<BsmStudentResource | BsmTeacherResource> {
    try {
      const resource = (
        await axios.post<{ user: RawBsmOAuthResource }>(this.BSM_AUTH_RESOURCE_URL, {
          ...this.bsmAuthPayload,
          token
        })
      ).data.user;
      return this.toResource(resource);
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            throw new BsmOauthError(ErrorType.INVALID_CLIENT, 'BSM OAuth 클라이언트 정보가 잘못되었습니다');
          case 404:
            throw new BsmOauthError(ErrorType.TOKEN_NOT_FOUND, 'BSM OAuth 토큰을 찾을 수 없습니다');
          default:
            throw error;
        }
      }
      throw error;
    }
  }

  private toResource(resource: RawBsmOAuthResource): BsmStudentResource | BsmTeacherResource {
    const { code: userCode, role, nickname, email, profileUrl } = resource;
    const commonResource = { userCode, nickname, email, profileUrl };

    if (role === UserRole.STUDENT) {
      return { ...commonResource, role, student: this.toStudent(resource) };
    }
    if (role === UserRole.TEACHER) {
      return { ...commonResource, role, teacher: this.toTeacher(resource) };
    }
    throw new BsmOauthError(ErrorType.INVALID_USER_ROLE);
  }

  private toStudent(resource: RawBsmOAuthResource): BsmStudent {
    const { name, enrolledAt, grade, classNo, studentNo } = resource;
    const isGraduate = !grade && !classNo && !studentNo;
    const cardinal = enrolledAt - 2020;

    return {
      name,
      enrolledAt,
      grade,
      classNo,
      studentNo,
      isGraduate,
      cardinal
    };
  }

  private toTeacher(resource: RawBsmOAuthResource): BsmTeacher {
    const { name } = resource;

    return { name };
  }
}
