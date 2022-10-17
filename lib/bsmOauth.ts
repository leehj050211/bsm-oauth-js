import axios, { AxiosError } from 'axios';
import BsmOauthError from './error';
import ErrorType from './types/errorType';
import { ResourceDto, TokenDto } from './types/oauthRawType';
import { Student, StudentResource } from './types/student';
import { Teacher, TeacherResource } from './types/teacher';
import UserRole from './types/userRole';

export default class BsmOauth {

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
            return (await axios.post<TokenDto>(this.BSM_AUTH_TOKEN_URL, {
                ...this.bsmAuthPayload,
                authCode
            })).data.token;
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 400: throw new BsmOauthError(ErrorType.INVALID_CLIENT, 'BSM OAuth 클라이언트 정보가 잘못되었습니다');
                    case 404: throw new BsmOauthError(ErrorType.AUTH_CODE_NOT_FOUND, 'BSM OAuth 인증 코드를 찾을 수 없습니다');
                    default: throw error;
                }
            }
            throw error;
        }
    }

    public async getResource(token: string): Promise<StudentResource | TeacherResource> {
        try {
            const resource = (await axios.post<{user: ResourceDto}>(this.BSM_AUTH_RESOURCE_URL, {
                ...this.bsmAuthPayload,
                token
            })).data.user;
            return this.convertResource(resource);
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 400: throw new BsmOauthError(ErrorType.INVALID_CLIENT, 'BSM OAuth 클라이언트 정보가 잘못되었습니다');
                    case 404: throw new BsmOauthError(ErrorType.TOKEN_NOT_FOUND, 'BSM OAuth 토큰를 찾을 수 없습니다');
                    default: throw error;
                }
            }
            throw error;
        }
    }

    private convertResource(resource: ResourceDto): StudentResource | TeacherResource {
        const { code: userCode, role, nickname, email } = resource;
        const commonResource = {
            userCode,
            nickname,
            email
        };

        switch (role) {
            case UserRole.STUDENT: return {
                ...commonResource,
                role,
                student: this.convertStudent(resource)
            }
            case UserRole.TEACHER: return {
                ...commonResource,
                role,
                teacher: this.convertTeacher(resource)
            }
        }
    }

    private convertStudent(resource: ResourceDto): Student {
        const {name, enrolledAt, grade, classNo, studentNo} = resource;
        
        return {
            name,
            enrolledAt,
            grade,
            classNo,
            studentNo
        };
    }
    
    private convertTeacher(resource: ResourceDto): Teacher {
        const {name} = resource;
        return {
            name
        }
    }

}