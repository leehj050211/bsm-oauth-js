import axios, { AxiosError } from 'axios';
import { BsmOauthError, BsmOauthErrorType } from './bsmOauthError';
import { BsmAuthUserRole, BsmOauthResourceDto, BsmOauthStudent, BsmOauthStudentResource, BsmOauthTeacher, BsmOauthTeacherResource, BsmOauthTokenDto } from './bsmOauthType';

export class BsmOauth {

    constructor(clientId: string, clientSecret: string) {
        this.bsmAuthPayload = {
            clientId,
            clientSecret
        };
    }

    private bsmAuthPayload: {
        clientId: string,
        clientSecret: string
    };
    private readonly BSM_AUTH_TOKEN_URL: string = "https://auth.bssm.kro.kr/api/oauth/token";
    private readonly BSM_AUTH_RESOURCE_URL: string = "https://auth.bssm.kro.kr/api/oauth/resource";

    public async getToken(authCode: string): Promise<string> {
        try {
            return (await axios.post<BsmOauthTokenDto>(this.BSM_AUTH_TOKEN_URL, {
                ...this.bsmAuthPayload,
                authCode
            })).data.token;
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 400: throw new BsmOauthError(BsmOauthErrorType.INVALID_CLIENT, 'BSM OAuth 클라이언트 정보가 잘못되었습니다');
                    case 404: throw new BsmOauthError(BsmOauthErrorType.AUTH_CODE_NOT_FOUND, 'BSM OAuth 인증 코드를 찾을 수 없습니다');
                    default: throw error;
                }
            }
            throw error;
        }
    }

    public async getResource(token: string): Promise<BsmOauthStudentResource | BsmOauthTeacherResource> {
        try {
            const resource = (await axios.post<{user: BsmOauthResourceDto}>(this.BSM_AUTH_RESOURCE_URL, {
                ...this.bsmAuthPayload,
                token
            })).data.user;
            return this.convertResource(resource);
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 400: throw new BsmOauthError(BsmOauthErrorType.INVALID_CLIENT, 'BSM OAuth 클라이언트 정보가 잘못되었습니다');
                    case 404: throw new BsmOauthError(BsmOauthErrorType.TOKEN_NOT_FOUND, 'BSM OAuth 토큰를 찾을 수 없습니다');
                    default: throw error;
                }
            }
            throw error;
        }
    }

    private convertResource(resource: BsmOauthResourceDto): BsmOauthStudentResource | BsmOauthTeacherResource {
        const { code: userCode, role, nickname, email } = resource;
        const commonResource = {
            userCode,
            nickname,
            email
        };

        switch (role) {
            case BsmAuthUserRole.STUDENT: return {
                ...commonResource,
                role,
                student: this.convertStudent(resource)
            }
            case BsmAuthUserRole.TEACHER: return {
                ...commonResource,
                role,
                teacher: this.convertTeacher(resource)
            }
        }
    }

    private convertStudent(resource: BsmOauthResourceDto): BsmOauthStudent {
        const {name, enrolledAt, grade, classNo, studentNo} = resource;
        
        return {
            name,
            enrolledAt,
            grade,
            classNo,
            studentNo
        };
    }
    
    private convertTeacher(resource: BsmOauthResourceDto): BsmOauthTeacher {
        const {name} = resource;
        return {
            name
        }
    }

}