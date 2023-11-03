import axios, { AxiosError, isAxiosError } from "axios";
import BsmOauthError from "./error.js";
import ErrorType from "./types/errorType.js";
import { RawBsmOAuthResource, RawBsmOAuthToken } from "./types/rawOAuthType.js";
import { BsmStudent, BsmStudentResource } from "./types/student.js";
import { BsmTeacher, BsmTeacherResource } from "./types/teacher.js";
import UserRole from "./types/userRole.js";
import handleHttpError from "./utils/handleHttpError.js";

export default class BsmOauth {
  constructor(clientId: string, clientSecret: string) {
    this.bsmAuthPayload = {
      clientId,
      clientSecret,
    };
  }

  private bsmAuthPayload: {
    clientId: string;
    clientSecret: string;
  };
  private readonly BSM_AUTH_TOKEN_URL: string =
    "https://auth.bssm.kro.kr/api/oauth/token";
  private readonly BSM_AUTH_RESOURCE_URL: string =
    "https://auth.bssm.kro.kr/api/oauth/resource";

  public async getToken(authCode: string): Promise<string> {
    try {
      return (
        await axios.post<RawBsmOAuthToken>(this.BSM_AUTH_TOKEN_URL, {
          ...this.bsmAuthPayload,
          authCode,
        })
      ).data.token;
    } catch (error) {
      if (isAxiosError(error)) {
        handleHttpError(error);
      }
      throw error;
    }
  }

  public async getResource(
    token: string
  ): Promise<BsmStudentResource | BsmTeacherResource> {
    try {
      const resource = (
        await axios.post<{ user: RawBsmOAuthResource }>(
          this.BSM_AUTH_RESOURCE_URL,
          {
            ...this.bsmAuthPayload,
            token,
          }
        )
      ).data.user;
      return this.toResource(resource);
    } catch (error) {
      if (isAxiosError(error)) {
        handleHttpError(error);
      }
      throw error;
    }
  }

  private toResource(
    resource: RawBsmOAuthResource
  ): BsmStudentResource | BsmTeacherResource {
    const { code: userCode, role, nickname, email, profileUrl } = resource;
    const commonResource = {
      userCode,
      nickname,
      email,
      profileUrl,
    };

    if (role === UserRole.STUDENT) {
      return {
        ...commonResource,
        role,
        student: this.toStudent(resource),
      };
    }
    if (role === UserRole.TEACHER) {
      return {
        ...commonResource,
        role,
        teacher: this.toTeacher(resource),
      };
    }
    throw new BsmOauthError(ErrorType.INVALID_USER_ROLE);
  }

  private toStudent(resource: RawBsmOAuthResource): BsmStudent {
    let isGraduate = false;
    const { name, enrolledAt, grade, classNo, studentNo } = resource;

    if (grade === 0 && classNo === 0 && studentNo === 0) {
      isGraduate = true;
    }

    return {
      name,
      enrolledAt,
      grade,
      classNo,
      studentNo,
      isGraduate,
    };
  }

  private toTeacher(resource: RawBsmOAuthResource): BsmTeacher {
    const { name } = resource;

    return {
      name,
    };
  }
}
