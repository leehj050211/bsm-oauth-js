export interface BsmOauthTokenDto {
    readonly token: string;
}

export enum BsmAuthUserRole {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER'
}

export interface BsmOauthStudent {
    readonly name: string;
    readonly enrolledAt: number;
    readonly grade: number;
    readonly classNo: number;
    readonly studentNo: number;
}

export interface BsmOauthTeacher {
    readonly name: string;
}

export interface BsmOauthResourceDto {
    readonly code: number;
    readonly nickname: string;
    readonly enrolledAt: number;
    readonly grade: number;
    readonly classNo: number;
    readonly studentNo: number;
    readonly name: string;
    readonly email: string;
    readonly role: BsmAuthUserRole;
}

interface BsmOauthCommonResource {
    readonly userCode: number;
    readonly role: BsmAuthUserRole
    readonly nickname: string;
    readonly email: string;
}

export interface BsmOauthStudentResource extends BsmOauthCommonResource {
    readonly role: BsmAuthUserRole.STUDENT;
    readonly student: BsmOauthStudent;
}

export interface BsmOauthTeacherResource extends BsmOauthCommonResource {
    readonly role: BsmAuthUserRole.TEACHER;
    readonly teacher: BsmOauthTeacher;
}
