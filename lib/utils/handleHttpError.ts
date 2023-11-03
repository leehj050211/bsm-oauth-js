import { AxiosError } from "axios";
import BsmOauthError from "../error";
import ErrorType from "../types/errorType";

const handleHttpError = (error: AxiosError) => {
  switch (error.response?.status) {
    case 400:
      throw new BsmOauthError(
        ErrorType.INVALID_CLIENT,
        "BSM OAuth 클라이언트 정보가 잘못되었습니다"
      );
    case 404:
      throw new BsmOauthError(
        ErrorType.TOKEN_NOT_FOUND,
        "BSM OAuth 토큰을 찾을 수 없습니다"
      );
    default:
      throw error;
  }
};

export default handleHttpError;
