import { AxiosError } from 'axios';
import BsmOauthError from './error.js';
import ErrorType from './types/errorType.js';

const handleToken = (error: AxiosError) => {
  switch (error.response?.status) {
    case 400:
      throw new BsmOauthError(ErrorType.INVALID_CLIENT, 'BSM OAuth 클라이언트 정보가 잘못되었습니다');
    case 404:
      throw new BsmOauthError(ErrorType.AUTH_CODE_NOT_FOUND, 'BSM OAuth 인증 코드를 찾을 수 없습니다');
    default:
      throw error;
  }
};

const handleResource = (error: AxiosError) => {
  switch (error.response?.status) {
    case 400:
      throw new BsmOauthError(ErrorType.INVALID_CLIENT, 'BSM OAuth 클라이언트 정보가 잘못되었습니다');
    case 404:
      throw new BsmOauthError(ErrorType.TOKEN_NOT_FOUND, 'BSM OAuth 토큰을 찾을 수 없습니다');
    default:
      throw error;
  }
};

export const ErrorHandler = {
  handleToken,
  handleResource
};
