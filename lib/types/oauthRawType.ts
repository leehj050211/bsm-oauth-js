import UserRole from "./userRole";

export interface TokenDto {
    readonly token: string;
}

export interface ResourceDto {
    readonly code: number;
    readonly nickname: string;
    readonly enrolledAt: number;
    readonly grade: number;
    readonly classNo: number;
    readonly studentNo: number;
    readonly name: string;
    readonly email: string;
    readonly role: UserRole;
}