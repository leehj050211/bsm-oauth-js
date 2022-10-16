import axios, { AxiosError } from 'axios';
import { BsmOauthError, BsmOauthErrorType } from './bsmOauthError';
import { BsmOauthTokenDto } from './bsmOauthType';

export class BsmOauth {

    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    private clientId: string;
    private clientSecret: string;
    private readonly BSM_AUTH_TOKEN_URL: string = "https://auth.bssm.kro.kr/api/oauth/token";
    private readonly BSM_AUTH_RESOURCE_URL: string = "https://auth.bssm.kro.kr/api/oauth/resource";

    public async getToken(authCode: string): Promise<string> {
        try {
            return (await axios.post<BsmOauthTokenDto>(this.BSM_AUTH_TOKEN_URL, {
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                authCode
            })).data.token;
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 400: throw new BsmOauthError(BsmOauthErrorType.INVALID_CLIENT, 'BSM OAuth 클라이언트 정보가 잘못되었습니다');
                    case 404: throw new BsmOauthError(BsmOauthErrorType.AUTH_CODE_NOT_FOUND, 'BSM OAuth 인증코드를 찾을 수 없습니다');
                    default: throw error;
                }
            }
            throw error;
        }
    }

}